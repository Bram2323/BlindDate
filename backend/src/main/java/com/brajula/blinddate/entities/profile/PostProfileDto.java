package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.BadRequestException;

import java.time.LocalDate;
import java.util.List;

/*
Dto does take in the image id, but does not convert it to do the image yet.
That is done in the service class.
The same goes for the sexualities list, adding that to profile entity is handled in the service class
 */
public record PostProfileDto(
        String description,
        String gender,
        String lookingForGender,
        LocalDate dateOfBirth,
        List<Long> sexualities,
        List<Long> interests,
        Long imageId) {
    public Profile toProfile(User user) {
        if (this.description == null
                || this.gender == null
                || this.lookingForGender == null
                || this.dateOfBirth == null
                || this.sexualities.isEmpty()
                || this.interests.isEmpty()
                || this.imageId == null) {
            throw new BadRequestException("incomplete profile");
        }
        try {
            Gender selectedGender = Gender.valueOf(this.gender.toUpperCase());
            Gender selectedSearchGender = Gender.valueOf(this.lookingForGender.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid Gender");
        }

        if (user == null) {
            throw new BadRequestException("No user provided");
        }

        return new Profile(
                this.description,
                Gender.valueOf(this.gender.toUpperCase()),
                Gender.valueOf(this.gender.toUpperCase()),
                this.dateOfBirth,
                user);
    }

    public Profile toProfile() {
        if (this.description == null
                || this.gender == null
                || this.lookingForGender == null
                || this.dateOfBirth == null
                || this.sexualities.isEmpty()) {
            throw new BadRequestException("incomplete profile");
        }
        try {
            Gender selectedGender = Gender.valueOf(this.gender.toUpperCase());
            Gender selectedSearchGender = Gender.valueOf(this.lookingForGender.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid Gender");
        }

        return new Profile(
                this.description,
                Gender.valueOf(this.gender.toUpperCase()),
                Gender.valueOf(this.gender.toUpperCase()),
                this.dateOfBirth);
    }
}
