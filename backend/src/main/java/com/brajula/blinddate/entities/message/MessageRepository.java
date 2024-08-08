package com.brajula.blinddate.entities.message;

import com.brajula.blinddate.entities.chat.Chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface MessageRepository extends JpaRepository<Message, Long> {
    Set<Message> findByChatOrderByCreatedOn(Chat chat);
}
