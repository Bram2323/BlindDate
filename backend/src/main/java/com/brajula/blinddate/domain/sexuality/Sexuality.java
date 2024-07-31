package com.brajula.blinddate.domain.sexuality;

import com.brajula.blinddate.domain.profile.Profile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class Sexuality {
    @Id @GeneratedValue Long id;
    @Setter String name;

    // TODO even dubbelchecken, maar volgens mij is deze niet nodig. hangt van plan af
    // @ManyToMany private Set<Profile> profiles = new HashSet<>();

    public Sexuality(String name) {
        this.name = name;
    }
}
