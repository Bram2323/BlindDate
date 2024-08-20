package com.brajula.blinddate.entities.preferences;

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
public class Preference {
    @Id @GeneratedValue Long id;
    @Setter String name;

    public Preference(String name) {
        this.name = name;
    }
}
