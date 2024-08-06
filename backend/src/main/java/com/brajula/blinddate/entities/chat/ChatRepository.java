package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chats c WHERE c.userOne = ?1 OR c.userTwo = ?1")
    Set<Chat> findByUser(User user);
}
