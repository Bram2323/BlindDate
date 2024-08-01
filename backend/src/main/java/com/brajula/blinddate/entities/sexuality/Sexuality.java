package com.brajula.blinddate.entities.sexuality;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Sexuality {
    @Id @GeneratedValue Long id;
    @Setter String name;

    public Sexuality(String name) {
        this.name = name;
    }
}
