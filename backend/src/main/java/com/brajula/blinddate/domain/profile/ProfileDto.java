package com.brajula.blinddate.domain.profile;

import java.time.LocalDate;
import java.util.List;

public record ProfileDto(
        String description, String gender, LocalDate dateOfBirth, List<Long> sexualities) {
    public Profile toProfile() {
        if (this.description == null
                || this.gender == null
                || this.dateOfBirth == null
                || this.sexualities.isEmpty()) {
            throw new IllegalArgumentException("incomplete profile");
        }
        try {
            Gender selectedGender = Gender.valueOf(this.gender.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid Gender");
        }

        return new Profile(
                this.description, Gender.valueOf(this.gender.toUpperCase()), this.dateOfBirth);
    }
}
