package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.user.User;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

@Transactional
public interface ProfileRepository
        extends JpaRepository<Profile, Long>, JpaSpecificationExecutor<Profile> {
    Optional<Profile> findByUser(User user);
}
