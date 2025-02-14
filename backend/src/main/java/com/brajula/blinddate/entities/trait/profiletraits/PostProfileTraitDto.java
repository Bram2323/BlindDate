package com.brajula.blinddate.entities.trait.profiletraits;

import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.exceptions.BadRequestException;

public record PostProfileTraitDto(Long id, String answer) {
    public ProfileTrait toAnswer(Trait trait) {
        if (this.answer == null) {
            throw new BadRequestException("Invalid answer");
        }

        String formattedAnswer;
        try {
            formattedAnswer = this.answer.toUpperCase().replace(" ", "_");
            Answer.valueOf(formattedAnswer);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid answer");
        }

        return new ProfileTrait(trait, Answer.valueOf(formattedAnswer));
    }
}
