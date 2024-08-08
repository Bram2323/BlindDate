package com.brajula.blinddate.entities.trait.profiletraits;

import com.brajula.blinddate.exceptions.BadRequestException;

public record GetProfileTraitDto(String question, Answer answer) {
    public GetProfileTraitDto toDto(ProfileTrait profileTrait) {
        if (profileTrait == null) {
            throw new BadRequestException("profile trait is empty");
        }
        if (profileTrait.getTrait().getQuestion() == null) {
            throw new BadRequestException("trait is null");
        }
        return new GetProfileTraitDto(
                profileTrait.getTrait().getQuestion(), profileTrait.getAnswer());
    }
}
