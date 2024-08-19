package com.brajula.blinddate.entities.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsernameIgnoreCase(String username);

    Page<User> findByUsernameIgnoreCaseContains(String username, Pageable pageable);

    @Query("SELECT u FROM Users u WHERE (u.username LIKE ?1) OR (u.firstName LIKE ?1) OR (u.lastName LIKE ?1)")
    Page<User> searchUsers(String search, Pageable pageable);
}
