package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageDTO;
import com.brajula.blinddate.entities.message.MessageRepository;
import com.brajula.blinddate.entities.message.TextDTO;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(Routes.CHATS)
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
public class ChatController {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @GetMapping("{id}")
    private ChatFullDTO get(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        Optional<Chat> possibleChat = chatRepository.findById(id);
        Chat chat = possibleChat.orElseThrow(NotFoundException::new);

        if (!chat.getUserOne().equals(user) && !chat.getUserTwo().equals(user))
            throw new ForbiddenException();

        Set<Message> messages = messageRepository.findByChatOrderByCreatedOn(chat);

        return ChatFullDTO.from(chat, messages);
    }

    @PostMapping("{id}")
    private MessageDTO createMessage(
            @PathVariable Long id, @RequestBody TextDTO textDTO, Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        String text = textDTO.text();
        if (text == null || text.isEmpty()) throw new BadRequestException("Text can't be empty!");
        String trimmedText = text.trim();

        Optional<Chat> possibleChat = chatRepository.findById(id);
        Chat chat = possibleChat.orElseThrow(NotFoundException::new);

        if (!chat.getUserOne().equals(user) && !chat.getUserTwo().equals(user))
            throw new ForbiddenException();

        Message newMessage =
                messageRepository.save(new Message(chat, user, trimmedText, LocalDateTime.now()));

        return MessageDTO.from(newMessage);
    }
}
