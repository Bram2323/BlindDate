package com.brajula.blinddate.entities.trait.profiletraits;

import com.brajula.blinddate.entities.trait.Trait;

import jakarta.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class ProfileTrait {
    @Id @GeneratedValue private Long id;

    @ManyToOne private Trait trait;

    private Answers answer;

    public ProfileTrait(Trait trait, Answers answer) {
        this.trait = trait;
        this.answer = answer;
    }
}
