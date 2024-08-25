package com.brajula.blinddate.entities.judgment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@RequiredArgsConstructor
public class Judgement {
    @Id @GeneratedValue private Long id;

    @Setter private Long judgeId;
    @Setter private Long potentialMatchId;
    @Setter private Boolean accepted;
}
