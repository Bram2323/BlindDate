package com.brajula.blinddate.entities.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsernameIgnoreCase(String username);

    Set<User> findByUsernameIgnoreCaseContains(String username);
}
