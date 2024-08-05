package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.Image;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.question.questionanswer.Answer;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
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
    @Setter private Gender lookingForGender;
    @Setter private LocalDate dateOfBirth;

    @OneToOne @Setter private User user;

    @ManyToMany @Setter private Set<Sexuality> sexualities;

    @ManyToMany @Setter private Set<Interest> interests = new HashSet<>();

    @OneToMany private Set<Answer> answers;

    @OneToOne @Setter private Image image;

    public Profile(
            String description,
            Gender gender,
            Gender lookingForGender,
            LocalDate dateOfBirth,
            User user) {
        this.description = description;
        this.gender = gender;
        this.lookingForGender = lookingForGender;
        this.dateOfBirth = dateOfBirth;
        this.user = user;
    }

    public Profile(
            String description, Gender gender, Gender lookingForGender, LocalDate dateOfBirth) {
        this.description = description;
        this.gender = gender;
        this.lookingForGender = lookingForGender;
        this.dateOfBirth = dateOfBirth;
    }
}
