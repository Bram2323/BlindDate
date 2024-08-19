package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public record JudgeProfileDto(
        Long id,
        String description,
        Gender gender,
        List<Gender> lookingForGender,
        int age,
        UUID userId,
        String username,
        Set<Sexuality> sexualities,
        Set<Interest> interests,
        Set<ProfileTrait> traits) {
    public static JudgeProfileDto toDto(Profile profile) {
        return new JudgeProfileDto(
                profile.getId(),
                profile.getDescription(),
                profile.getGender(),
                profile.getLookingForGender(),
                profile.getAge(),
                profile.getUser().getId(),
                profile.getUser().getUsername(),
                profile.getSexualities(),
                profile.getInterests(),
                profile.getProfileTraits());
    }
}
