package com.brajula.blinddate.entities.user;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(Routes.USERS)
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("{id}")
    private UserFullDTO getFullUser(@PathVariable UUID id, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        if (!(authUser.getId().equals(id) || authUser.hasRole(Role.ADMIN)))
            throw new ForbiddenException();

        Optional<User> possibleUser = userRepository.findById(id);
        User user = possibleUser.orElseThrow(NotFoundException::new);

        return UserFullDTO.from(user);
    }
}
