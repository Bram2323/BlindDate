package com.brajula.blinddate.entities.judgment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JudgementRepository extends JpaRepository<Judgement, Long> {
    List<Judgement> findByJudgeIdEquals(Long equals);

    List<Judgement> findByJudgeIdAndAccepted(Long judgeId, Boolean accepted);

    List<Judgement> findByJudgedIdAndAccepted(Long judgedId, Boolean accepted);
}
