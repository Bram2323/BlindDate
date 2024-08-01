package com.brajula.blinddate.entities.user;

import java.util.UUID;

public record UserDTO(String username, UUID id, String role) {
    public static UserDTO from(User user) {
        return new UserDTO(user.getUsername(), user.getId(), user.getRole());
    }
}