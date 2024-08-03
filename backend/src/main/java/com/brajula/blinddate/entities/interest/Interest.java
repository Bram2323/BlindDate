package com.brajula.blinddate.entities.interest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class Interest {
    @Id @GeneratedValue private Long id;

    private String name;

    public Interest(String name) {
        this.name = name;
    }
}
