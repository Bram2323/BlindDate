package com.brajula.blinddate.entities.profile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id @GeneratedValue Long id;

    @Setter private String description;
    @Setter private Gender gender;
    @Setter private LocalDate dateOfBirth;

    @ManyToMany @Setter private Set<Sexuality> sexualities;

    public Profile(
            String description, Gender gender, LocalDate dateOfBirth, Set<Sexuality> sexualities) {

        this.description = description;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.sexualities = sexualities;
    }

    public Profile(String description, Gender gender, LocalDate dateOfBirth) {
        this.description = description;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }
}
