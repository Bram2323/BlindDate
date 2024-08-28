package com.brajula.blinddate.entities.judgment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JudgementRepository extends JpaRepository<Judgement, Long> {
    List<Judgement> findByJudgeIdEquals(Long equals);

    @Query("SELECT j.id FROM Judgement j WHERE j.judgeId = ?1 AND j.accepted = TRUE")
    List<Long> findByJudgedIdAndJudgeIdAndAcceptedTrue(Long judgeId);

    List<Judgement> findByJudgeIdAndJudgedIdAndAcceptedTrue(Long judgeId, Long potentialMatchId);
}
