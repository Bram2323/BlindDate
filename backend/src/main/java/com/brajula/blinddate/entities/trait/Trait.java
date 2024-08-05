package com.brajula.blinddate.entities.trait;

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
public class Trait {
    @Id @GeneratedValue private Long id;

    @Setter private String question;

    public Trait(String question) {
        this.question = question;
    }
}
