package com.brajula.blinddate.entities.chat;

import com.brajula.blinddate.entities.user.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query(
            "SELECT c FROM Chats c WHERE (c.userOne = ?1 AND NOT c.closedByUserOne) OR (c.userTwo = ?1  AND NOT c.closedByUserTwo)")
    Set<Chat> findByUser(User user);

    @Query(
            "SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END "
                    + "FROM Chats c WHERE "
                    + "((c.userOne = ?1 AND c.userTwo = ?2) OR (c.userOne = ?2 AND c.userTwo = ?1))")
    boolean chatBetweenUsersExists(User userOne, User userTwo);
}
