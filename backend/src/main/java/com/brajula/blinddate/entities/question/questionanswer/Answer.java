package com.brajula.blinddate.entities.question.questionanswer;

import com.brajula.blinddate.entities.question.Question;

import jakarta.persistence.*;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Getter
@Entity
public class Answer {
    @Id @GeneratedValue private Long id;

    @ManyToOne private Question question;

    private AnswerOptions answer;
}
