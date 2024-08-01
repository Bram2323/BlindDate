package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.user.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUser(User user);
}
