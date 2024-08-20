package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;
import com.brajula.blinddate.preferences.Preference;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record GetProfileDto(
        Long id,
        String description,
        Gender gender,
        List<Gender> lookingForGender,
        LocalDate dateOfBirth,
        Integer age,
        UUID userId,
        String username,
        Set<Sexuality> sexualities,
        Set<Interest> interests,
        Set<ProfileTrait> traits,
        Set<Preference> preferences,
        Long imageId,
        int matchScore) {
    private static GetProfileDto createFrom(Profile profile, int matchScore) {
        return new GetProfileDto(
                profile.getId(),
                profile.getDescription(),
                profile.getGender(),
                profile.getLookingForGender(),
                profile.getDateOfBirth(),
                profile.getAge(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getSexualities(),
                profile.getInterests(),
                profile.getProfileTraits(),
                profile.getPreferences(),
                profile.getImage().getId(),
                matchScore);
    }

    // als geen score berekend is word er -1 meegegeven
    public static GetProfileDto from(Profile profile) {
        return createFrom(profile, -1);
    }

    public static GetProfileDto from(Profile profile, int matchScore) {
        return createFrom(profile, matchScore);
    }
}
