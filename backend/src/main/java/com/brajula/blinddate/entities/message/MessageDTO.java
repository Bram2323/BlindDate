package com.brajula.blinddate.entities.message;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageDTO(
        Long id, UUID userId, String text, LocalDateTime createdOn, Boolean isRead) {

    public static MessageDTO from(Message message) {
        return new MessageDTO(
                message.getId(),
                message.getUser().getId(),
                message.getText(),
                message.getCreatedOn(),
                message.getIsRead());
    }
}
