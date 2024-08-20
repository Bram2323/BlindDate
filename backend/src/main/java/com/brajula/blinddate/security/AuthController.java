package com.brajula.blinddate.security;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.user.*;
import com.brajula.blinddate.exceptions.BadRequestException;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(Routes.AUTHENTICATION)
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
public class AuthController {
    private final JwtService jwtService;
    private final UserService userService;
    private final UserRepository userRepository;
    private static final int MAX_USERNAME_LENGTH = 20;

    @PostMapping("login")
    public ResponseEntity<TokenDTO> login(@RequestBody AuthLoginDTO authDTO) {
        String username = authDTO.username();
        String password = authDTO.password();
        if (username == null) throw new BadRequestException("Username is required!");
        if (password == null) throw new BadRequestException("Password is required!");

        Optional<User> possibleUser = userRepository.findByUsernameIgnoreCase(username);
        if (possibleUser.isEmpty()) throw new BadRequestException("User doesn't exist!");
        User user = possibleUser.get();

        if (!userService.isCorrectPassword(user, password))
            throw new BadRequestException("Password is incorrect!");

        if (!user.isEnabled()) throw new BadRequestException("Account is disabled!");

        return ResponseEntity.ok(
                new TokenDTO(jwtService.generateTokenForUser(user), UserFullDTO.from(user)));
    }

    @PostMapping("register")
    public ResponseEntity<TokenDTO> register(@RequestBody AuthRegisterDTO authDTO) {
        String username = authDTO.username();
        String password = authDTO.password();
        String firstName = authDTO.firstName();
        String lastName = authDTO.lastName();
        String email = authDTO.email();
        if (username == null) throw new BadRequestException("Username is required!");
        if (username.length() > MAX_USERNAME_LENGTH)
            throw new BadRequestException("Username can't be longer than 20 characters!");
        if (password == null) throw new BadRequestException("Password is required!");
        if (firstName == null) throw new BadRequestException("First name is required!");
        if (lastName == null) throw new BadRequestException("Last name is required!");
        if (email == null) throw new BadRequestException("Email is required!");

        String trimmedFirstName = firstName.trim();
        String trimmedLastName = lastName.trim();
        String trimmedEmail = email.trim();

        if (trimmedFirstName.isEmpty()) throw new BadRequestException("First name can't be blank!");
        if (trimmedLastName.isEmpty()) throw new BadRequestException("Last name can't be blank!");
        if (trimmedEmail.isEmpty()) throw new BadRequestException("Email can't be blank!");

        username = username.trim();

        if (!userService.isValidUsername(username))
            throw new BadRequestException("Username is invalid!");
        if (!userService.isValidPassword(password))
            throw new BadRequestException("Password is invalid!");

        if (userRepository.findByUsernameIgnoreCase(username).isPresent())
            throw new BadRequestException("User already exists!");

        User user =
                userService.register(
                        username, password, trimmedFirstName, trimmedLastName, trimmedEmail);

        return ResponseEntity.ok(
                new TokenDTO(jwtService.generateTokenForUser(user), UserFullDTO.from(user)));
    }
}
