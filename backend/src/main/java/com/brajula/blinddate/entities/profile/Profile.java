package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id @GeneratedValue Long id;

    @Setter private String description;
    @Setter private Gender gender;
    @Setter private LocalDate dateOfBirth;

    @OneToOne @Setter private User user;

    @ManyToMany @Setter private Set<Sexuality> sexualities;

    public Profile(String description, Gender gender, LocalDate dateOfBirth, User user) {
        this.description = description;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.user = user;
    }

    public Profile(String description, Gender gender, LocalDate dateOfBirth) {
        this.description = description;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }
}
