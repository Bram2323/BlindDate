package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.trait.profiletraits.PostProfileTraitDto;

import java.time.LocalDate;
import java.util.List;

/*
Dto does take in the image id, but does not convert it to do the image yet.
That is done in the service class.
The same goes for the sexualities list, adding that to profile entity is handled in the service class
 */
public record PatchProfileDto(
        String description,
        String gender,
        List<String> lookingForGender,
        LocalDate dateOfBirth,
        List<Long> sexualities,
        List<Long> interests,
        List<PostProfileTraitDto> traits,
        Long imageId) {}
