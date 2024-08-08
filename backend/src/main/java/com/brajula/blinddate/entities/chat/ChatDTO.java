package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.UserDTO;

import java.time.LocalDateTime;

public record ChatDTO(
        Long id,
        UserDTO userOne,
        UserDTO userTwo,
        Boolean closedByUserOne,
        Boolean closedByUserTwo,
        LocalDateTime createdOn) {

    public static ChatDTO from(Chat chat) {
        return new ChatDTO(
                chat.getId(),
                UserDTO.from(chat.getUserOne()),
                UserDTO.from(chat.getUserTwo()),
                chat.getClosedByUserOne(),
                chat.getClosedByUserTwo(),
                chat.getCreatedOn());
    }
}
