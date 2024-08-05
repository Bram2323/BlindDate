package com.brajula.blinddate.entities.sexuality;

import com.brajula.blinddate.exceptions.BadRequestException;

public record PostCreationDto(String name) {
    public Sexuality toSexuality() {
        if (this.name == null) {
            throw new BadRequestException("Sexuality has no value");
        }
        return new Sexuality(this.name);
    }
}
