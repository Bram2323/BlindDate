package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.message.Message;
import com.brajula.blinddate.entities.message.MessageDTO;
import com.brajula.blinddate.entities.user.UserDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public record ChatFullDTO(
        Long id,
        UserDTO userOne,
        UserDTO userTwo,
        Boolean closedByUserOne,
        Boolean closedByUserTwo,
        LocalDateTime createdOn,
        List<MessageDTO> messages) {

    public static ChatFullDTO from(Chat chat, Set<Message> messages) {
        return new ChatFullDTO(
                chat.getId(),
                UserDTO.from(chat.getUserOne()),
                UserDTO.from(chat.getUserTwo()),
                chat.getClosedByUserOne(),
                chat.getClosedByUserTwo(),
                chat.getCreatedOn(),
                messages.stream().map(MessageDTO::from).toList());
    }
}
