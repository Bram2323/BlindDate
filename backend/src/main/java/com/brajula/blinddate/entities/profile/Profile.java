package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.Image;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();

    public void addImage(Image image) {
        this.images.add(image);
    }

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
