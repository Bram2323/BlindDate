package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.message.*;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(Routes.CHATS)
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
public class ChatController {
    private final ChatRepository chatRepository;
    private final ChatService chatService;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/new/{matchId}")
    private void createChat(@PathVariable UUID matchId, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        User match = userRepository.findById(matchId).orElseThrow(NotFoundException::new);
        Chat savedChat = chatService.startNewChat(authUser, match);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(savedChat.getId())
                        .toUri();
    }

    @GetMapping("user/{userId}")
    private List<ChatDTO> getFromUser(@PathVariable UUID userId, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        Optional<User> possibleUser = userRepository.findById(userId);
        User user = possibleUser.orElseThrow(NotFoundException::new);

        if (!authUser.hasRole(Role.ADMIN) && !user.equals(authUser)) throw new ForbiddenException();

        Set<Chat> chats = chatRepository.findByUser(user);

        return chats.stream()
                .map(
                        (chat) -> {
                            Optional<Message> lastMessage =
                                    messageRepository.findFirstByChatOrderByCreatedOnDesc(chat);
                            return ChatDTO.from(chat, lastMessage.orElse(null));
                        })
                .toList();
    }

    @GetMapping("user/{userId}/unread")
    private List<ChatDTO> getFromUserUnread(
            @PathVariable UUID userId, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        Optional<User> possibleUser = userRepository.findById(userId);
        User user = possibleUser.orElseThrow(NotFoundException::new);

        if (!authUser.hasRole(Role.ADMIN) && !user.equals(authUser)) throw new ForbiddenException();

        Set<Chat> chats = chatRepository.findByUser(user);

        List<Chat> filteredChats =
                chats.stream()
                        .filter((chat -> chatService.isChatUnreadByUser(chat, user)))
                        .toList();

        return filteredChats.stream()
                .map(
                        (chat) -> {
                            Optional<Message> lastMessage =
                                    messageRepository.findFirstByChatOrderByCreatedOnDesc(chat);
                            return ChatDTO.from(chat, lastMessage.orElse(null));
                        })
                .toList();
    }

    @GetMapping("{id}")
    private ChatFullDTO get(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Optional<Chat> possibleChat = chatRepository.findById(id);
        Chat chat = possibleChat.orElseThrow(NotFoundException::new);

        if (!user.equals(chat.getUserOne()) && !user.equals(chat.getUserTwo())) {
            throw new ForbiddenException();
        }

        chatService.setChatReadForUser(chat, user, true);

        Set<Message> messages = messageRepository.findByChatOrderByCreatedOn(chat);

        return ChatFullDTO.from(chat, messages);
    }

    @PostMapping("{id}")
    private MessageDTO createMessage(
            @PathVariable Long id, @RequestBody TextDTO textDTO, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        String text = textDTO.text();
        if (text == null) throw new BadRequestException("Text can't be null!");

        Optional<Chat> possibleChat = chatRepository.findById(id);
        Chat chat = possibleChat.orElseThrow(NotFoundException::new);

        if (!chat.getUserOne().equals(user) && !chat.getUserTwo().equals(user))
            throw new ForbiddenException();

        if (chat.getClosedByUserOne() || chat.getClosedByUserTwo())
            throw new BadRequestException("This chat is closed!");

        String trimmedText = text.trim();
        if (trimmedText.isEmpty()) throw new BadRequestException("Text can't be empty!");
        else if (trimmedText.length() > 30000)
            throw new BadRequestException("Text can't be more than 30000 characters!");

        Message newMessage =
                messageRepository.save(new Message(chat, user, trimmedText, LocalDateTime.now()));

        Optional<User> possibleOtherUser = chatService.getOtherUser(chat, user);
        if (possibleOtherUser.isPresent()) {
            User otherUser = possibleOtherUser.get();
            chatService.setChatReadForUser(chat, otherUser, false);
        }

        sendNotification(chat.getUserOne(), newMessage);
        sendNotification(chat.getUserTwo(), newMessage);

        return MessageDTO.from(newMessage);
    }

    @MessageMapping("/read-chat-{chatId}")
    public void setRead(@Payload String userId, @DestinationVariable Long chatId) {
        Optional<Chat> chat = chatRepository.findById(chatId);
        Optional<User> user = userRepository.findById(UUID.fromString(userId));

        if (chat.isEmpty() || user.isEmpty()) return;

        chatService.setChatReadForUser(chat.get(), user.get(), true);
    }

    @DeleteMapping("{id}")
    private ResponseEntity<Void> closeChat(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Chat chat = chatRepository.findById(id).orElseThrow(NotFoundException::new);

        User userOne = chat.getUserOne();
        User userTwo = chat.getUserTwo();

        if (userOne.equals(user)) chat.setClosedByUserOne(true);
        else if (userTwo.equals(user)) chat.setClosedByUserTwo(true);
        else throw new ForbiddenException();

        chatRepository.save(chat);

        return ResponseEntity.noContent().build();
    }

    private void sendNotification(User user, Message message) {
        messagingTemplate.convertAndSendToUser(
                user.getId().toString(), "notification", MessageNotificationDTO.from(message));
    }
}
