package com.brajula.blinddate.entities.judgment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Judgement {
    @Id @GeneratedValue private Long id;

    @Setter private Long judgeId;
    @Setter private Long judgedId;
    @Setter private Boolean accepted;
}
