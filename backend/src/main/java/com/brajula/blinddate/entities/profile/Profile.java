package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.Image;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.preferences.Preference;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;
import com.brajula.blinddate.entities.user.User;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashSet;
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
    @Setter private List<Gender> lookingForGender = new ArrayList<>();
    @Setter private LocalDate dateOfBirth;
    @Setter private Integer minAge;
    @Setter private Integer maxAge;

    @OneToOne @Setter private User user;

    @ManyToMany @Setter private Set<Sexuality> sexualities = new HashSet<>();

    @ManyToMany @Setter private Set<Preference> preferences = new HashSet<>();

    @ManyToMany @Setter private Set<Interest> interests = new HashSet<>();

    @OneToMany @Setter private Set<ProfileTrait> profileTraits;

    @OneToOne @Setter private Image image;

    public Profile(
            String description,
            Gender gender,
            List<Gender> lookingForGender,
            LocalDate dateOfBirth,
            User user,
            Integer minAge,
            Integer maxAge) {
        this.description = description;
        this.gender = gender;
        this.lookingForGender = lookingForGender;
        this.dateOfBirth = dateOfBirth;
        this.user = user;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    public Profile(
            String description,
            Gender gender,
            List<Gender> lookingForGender,
            LocalDate dateOfBirth,
            Integer minAge,
            Integer maxAge) {
        this.description = description;
        this.gender = gender;
        this.lookingForGender = lookingForGender;
        this.dateOfBirth = dateOfBirth;
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    public int getAge() {
        LocalDate today = LocalDate.now();
        return Period.between(dateOfBirth, today).getYears();
    }
}
