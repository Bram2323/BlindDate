package com.brajula.blinddate.entities.question;

public record QuestionCreationDto(String question) {
    public Question toQuestion() {
        return new Question(this.question);
    }
}
