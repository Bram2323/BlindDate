package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.Image;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.sexuality.Sexuality;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public record GetProfileDto(
        Long id,
        String description,
        Gender gender,
        Gender lookingForGender,
        LocalDate dateOfBirth,
        UUID userId,
        String username,
        Set<Sexuality> sexualities,
        Set<Interest> interests,
        Image image) {
    public static GetProfileDto toDto(Profile profile) {
        return new GetProfileDto(
                profile.getId(),
                profile.getDescription(),
                profile.getGender(),
                profile.getLookingForGender(),
                profile.getDateOfBirth(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getSexualities(),
                profile.getInterests(),
                profile.getImage());
    }
}
