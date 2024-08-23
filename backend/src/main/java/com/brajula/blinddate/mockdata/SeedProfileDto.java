package com.brajula.blinddate.mockdata;

import com.brajula.blinddate.entities.profile.Gender;
import com.brajula.blinddate.entities.profile.Profile;

import java.time.LocalDate;
import java.util.List;

public record SeedProfileDto(
        String description,
        Gender gender,
        List<Gender> lookingForGender,
        LocalDate dateOfBirth,
        Integer minAge,
        Integer maxAge) {
    public static Profile from(SeedProfileDto dto) {
        return new Profile(
                dto.description,
                dto.gender,
                dto.lookingForGender,
                dto.dateOfBirth(),
                dto.minAge(),
                dto.maxAge);
    }
}
