package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageDTO;
import com.brajula.blinddate.entities.user.UserDTO;

import java.time.LocalDateTime;

public record ChatDTO(
        Long id,
        UserDTO userOne,
        UserDTO userTwo,
        Boolean closedByUserOne,
        Boolean closedByUserTwo,
        Boolean readByUserOne,
        Boolean readByUserTwo,
        LocalDateTime createdOn,
        MessageDTO lastMessage) {

    public static ChatDTO from(Chat chat, Message lastMessage) {

        return new ChatDTO(
                chat.getId(),
                UserDTO.from(chat.getUserOne()),
                UserDTO.from(chat.getUserTwo()),
                chat.getClosedByUserOne(),
                chat.getClosedByUserTwo(),
                chat.getReadByUserOne(),
                chat.getReadByUserTwo(),
                chat.getCreatedOn(),
                lastMessage != null ? MessageDTO.from(lastMessage) : null);
    }
}
