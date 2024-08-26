package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.preferences.Preference;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record GetProfileMinimalDto(
        Long id,
        String description,
        Gender gender,
        LocalDate dateOfBirth,
        int age,
        UUID userId,
        String username,
        Set<Interest> interests,
        Set<ProfileTrait> traits,
        Set<Preference> preferences,
        int matchScore) {
    private static GetProfileMinimalDto createFrom(Profile profile, int matchScore) {
        return new GetProfileMinimalDto(
                profile.getId(),
                profile.getDescription(),
                profile.getGender(),
                profile.getDateOfBirth(),
                profile.getAge(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getInterests(),
                profile.getProfileTraits(),
                profile.getPreferences(),
                matchScore);
    }

    // als geen score berekend is word er -1 meegegeven
    public static GetProfileMinimalDto from(Profile profile) {
        return createFrom(profile, -1);
    }

    public static GetProfileMinimalDto from(Profile profile, int matchScore) {
        return createFrom(profile, matchScore);
    }
}
