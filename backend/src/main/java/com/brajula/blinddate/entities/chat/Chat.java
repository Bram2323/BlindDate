package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity(name = "Chats")
@NoArgsConstructor
@Getter
@Setter
public class Chat {
    @Id @GeneratedValue private Long id;

    @ManyToOne private User userOne;
    private Boolean closedByUserOne;

    @ManyToOne private User userTwo;
    private Boolean closedByUserTwo;

    private LocalDateTime createdOn;

    public Chat(User userOne, User userTwo, LocalDateTime createdOn) {
        this.userOne = userOne;
        this.userTwo = userTwo;
        this.createdOn = createdOn;

        closedByUserOne = false;
        closedByUserTwo = false;
    }
}
