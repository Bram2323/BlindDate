package com.brajula.blinddate.entities.sexuality;

public record SexualityCreationDto(String name) {
    public Sexuality toSexuality() {
        if (this.name == null) {
            throw new IllegalArgumentException("sexuality has no value");
        }
        return new Sexuality(this.name);
    }
}
