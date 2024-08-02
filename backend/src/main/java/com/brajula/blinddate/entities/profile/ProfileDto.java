package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.BadRequestException;

import java.time.LocalDate;
import java.util.List;

public record ProfileDto(
        String description, String gender, LocalDate dateOfBirth, List<Long> sexualities) {
    public Profile toProfile(User user) {
        if (this.description == null
                || this.gender == null
                || this.dateOfBirth == null
                || this.sexualities.isEmpty()) {
            throw new BadRequestException("incomplete profile");
        }
        try {
            Gender selectedGender = Gender.valueOf(this.gender.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid Gender");
        }

        if (user == null) {
            throw new BadRequestException("No user provided");
        }

        return new Profile(
                this.description,
                Gender.valueOf(this.gender.toUpperCase()),
                this.dateOfBirth,
                user);
    }

    public Profile toProfile() {
        if (this.description == null
                || this.gender == null
                || this.dateOfBirth == null
                || this.sexualities.isEmpty()) {
            throw new BadRequestException("incomplete profile");
        }
        try {
            Gender selectedGender = Gender.valueOf(this.gender.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid Gender");
        }

        return new Profile(
                this.description, Gender.valueOf(this.gender.toUpperCase()), this.dateOfBirth);
    }
}
