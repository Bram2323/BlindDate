package com.brajula.blinddate.entities.question;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class Question {
    @Id @GeneratedValue private Long id;

    @Setter private String question;

    public Question(String question) {
        this.question = question;
    }
}
