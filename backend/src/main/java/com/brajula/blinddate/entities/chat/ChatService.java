package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.BadRequestException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public boolean isChatUnreadByUser(Chat chat, User user) {
        if (chat.getUserOne().equals(user) && !chat.getReadByUserOne()) return true;
        if (chat.getUserTwo().equals(user) && !chat.getReadByUserTwo()) return true;
        return false;
    }

    public void setChatReadForUser(Chat chat, User user, boolean read) {
        if (chat.getUserOne().equals(user)) chat.setReadByUserOne(read);
        if (chat.getUserTwo().equals(user)) chat.setReadByUserTwo(read);
        chatRepository.save(chat);
    }

    public Optional<User> getOtherUser(Chat chat, User currentUser) {
        if (chat.getUserOne().equals(currentUser)) return Optional.of(chat.getUserTwo());
        if (chat.getUserTwo().equals(currentUser)) return Optional.of(chat.getUserOne());
        return Optional.empty();
    }

    public Chat startNewChat(User userOne, User userTwo) {
        if (chatRepository.chatBetweenUsersExists(userOne, userTwo)) {
            throw new BadRequestException("Chat already exists");
        }
        Chat chat = new Chat();
        chat.setUserOne(userOne);
        chat.setUserTwo(userTwo);
        chat.setReadByUserOne(false);
        chat.setReadByUserTwo(false);
        return chatRepository.save(chat);
    }

    public boolean hasChatBetween(User userOne, User userTwo) {
        return chatRepository.chatBetweenUsersExists(userOne, userTwo);
    }
}
