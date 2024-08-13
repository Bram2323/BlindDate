package com.brajula.blinddate.entities.user;

import java.util.UUID;

public record UserFullDTO(
        String username,
        String firstName,
        String lastName,
        String email,
        UUID id,
        String role,
        Long imageId) {
    public static UserFullDTO from(User user) {
        return new UserFullDTO(
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getId(),
                user.getRole(),
                user.getImageId());
    }
}
