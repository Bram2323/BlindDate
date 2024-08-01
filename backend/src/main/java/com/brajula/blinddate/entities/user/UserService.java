package com.brajula.blinddate.entities.user;

import com.brajula.blinddate.security.Role;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    public User register(
            String username, String password, String firstName, String lastName, String email) {
        if (userRepository.findByUsernameIgnoreCase(username).isPresent())
            throw new IllegalArgumentException("Username already exists!");
        return userRepository.save(
                new User(
                        username,
                        passwordEncoder.encode(password),
                        Role.USER,
                        firstName,
                        lastName,
                        email));
    }

    public User changePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public User changeRole(User user, Role role) {
        user.setRole(role);
        return userRepository.save(user);
    }

    public boolean isCorrectPassword(User user, String password) {
        return passwordEncoder.matches(password, user.getPassword());
    }

    public boolean isValidUsername(String username) {
        if (username == null) return false;
        if (username.length() != username.trim().length())
            return false; // checks for leading or trailing whitespace

        return username.length() >= 3;
    }

    public boolean isValidPassword(String password) {
        if (password == null) return false;
        if (password.length() < 8) return false;

        boolean hasUppercaseLetter = false;
        boolean hasLowercaseLetter = false;
        boolean hasNumber = false;
        boolean hasSpecialCharacter = false;

        for (char chr : password.toCharArray()) {
            if (Character.isLetter(chr)) {
                if (Character.toUpperCase(chr) == chr) hasUppercaseLetter = true;
                if (Character.toLowerCase(chr) == chr) hasLowercaseLetter = true;
            } else if (Character.isDigit(chr)) hasNumber = true;
            else hasSpecialCharacter = true;
        }

        return hasUppercaseLetter && hasLowercaseLetter && hasNumber && hasSpecialCharacter;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> possibleUser = userRepository.findByUsernameIgnoreCase(username);
        return possibleUser.orElseThrow(
                () -> new UsernameNotFoundException(username + " was not found!"));
    }
}
