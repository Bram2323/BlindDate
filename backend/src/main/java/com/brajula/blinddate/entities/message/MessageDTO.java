package com.brajula.blinddate.entities.message;

import com.brajula.blinddate.entities.user.UserDTO;

import java.time.LocalDateTime;

public record MessageDTO(Long id, UserDTO user, String text, LocalDateTime createdOn) {

    public static MessageDTO from(Message message) {
        return new MessageDTO(
                message.getId(),
                UserDTO.from(message.getUser()),
                message.getText(),
                message.getCreatedOn());
    }
}
