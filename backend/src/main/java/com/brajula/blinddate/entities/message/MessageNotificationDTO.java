package com.brajula.blinddate.entities.message;

import com.brajula.blinddate.entities.user.UserDTO;

import java.time.LocalDateTime;

public record MessageNotificationDTO(Long chatId, MessageDTO message) {

    public static MessageNotificationDTO from(Message message) {
        return new MessageNotificationDTO(
                message.getChat().getId(),
                MessageDTO.from(message));
    }
}
