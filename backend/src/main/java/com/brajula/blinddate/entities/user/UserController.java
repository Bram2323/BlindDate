package com.brajula.blinddate.entities.user;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(Routes.USERS)
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
public class UserController {
    public static final int USERS_PER_PAGE = 25;


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

    @GetMapping("/all")
    private Page<UserFullDTO> getAllUsers(@RequestParam(required = false, name = "search") String search, @RequestParam(required = false, name = "page") Integer pageParam, Authentication authentication){
        User user = (User) authentication.getPrincipal();

        if (!user.hasRole(Role.ADMIN)) throw new ForbiddenException();

        int page = pageParam != null ? pageParam - 1 : 0;
        Pageable pageable = PageRequest.of(page, USERS_PER_PAGE, Sort.by("username"));

        Page<User> users;
        if (search == null || search.isEmpty()){
            users = userRepository.findAll(pageable);
        }
        else {
            users = userRepository.searchUsers(search, pageable);
        }

        return users.map(UserFullDTO::from);
    }

    @DeleteMapping("{id}")
    private UserFullDTO disableUser(@PathVariable UUID id, Authentication authentication){
        User authUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        if (user.hasRole(Role.ADMIN) || (!user.equals(authUser) && !authUser.hasRole(Role.ADMIN))) throw new ForbiddenException();

        user.setEnabled(false);
        user = userRepository.save(user);

        return UserFullDTO.from(user);
    }

    @PostMapping("{id}/enable")
    private UserFullDTO enableUser(@PathVariable UUID id, Authentication authentication){
        User authUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        if (!authUser.hasRole(Role.ADMIN)) throw new ForbiddenException();

        user.setEnabled(true);
        user = userRepository.save(user);

        return UserFullDTO.from(user);
    }
}
