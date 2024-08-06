package com.brajula.blinddate.entities.message;

import com.brajula.blinddate.entities.chat.Chat;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "Messages")
@NoArgsConstructor
@Getter
@Setter
public class Message {

    @Id @GeneratedValue private Long id;

    @ManyToOne private Chat chat;

    @ManyToOne private User user;

    private String text;

    private LocalDateTime createdOn;

    private Boolean isRead;

    public Message(Chat chat, User user, String text, LocalDateTime createdOn) {
        this.chat = chat;
        this.user = user;
        this.text = text;
        this.createdOn = createdOn;

        isRead = false;
    }
}
