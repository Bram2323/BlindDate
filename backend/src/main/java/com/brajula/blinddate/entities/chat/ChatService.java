package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.User;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public boolean isChatUnreadByUser(Chat chat, User user) {
        if (chat.getUserOne().equals(user) && !chat.getReadByUserOne()) return true;
        if (chat.getUserTwo().equals(user) && !chat.getReadByUserTwo()) return true;
        return false;
    }

    public Chat setChatUnreadForOtherUser(Chat chat, User user) {
        if (chat.getUserOne().equals(user)) chat.setReadByUserTwo(false);
        if (chat.getUserTwo().equals(user)) chat.setReadByUserOne(false);
        return chatRepository.save(chat);
    }
}
