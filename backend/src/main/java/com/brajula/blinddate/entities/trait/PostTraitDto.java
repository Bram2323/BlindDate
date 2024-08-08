package com.brajula.blinddate.entities.trait;

public record PostTraitDto(String question) {
    public Trait toQuestion() {
        return new Trait(this.question);
    }
}
