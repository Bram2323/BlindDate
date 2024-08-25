package com.brajula.blinddate.entities.judgment;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JudgementService {
    private final JudgementRepository judgementRepository;

    public List<Long> getJudgedIdsByJudgeId(Long judgeId) {
        List<Long> judgedIds = new LinkedList<>();
        List<Judgement> judgementsByJudgeId = judgementRepository.findByJudgeIdEquals(judgeId);
        for (Judgement judgement : judgementsByJudgeId) {
            judgedIds.add(judgement.getPotentialMatchId());
        }
        return judgedIds;
    }

    public List<Long> findMutualMatches(Long judgeId) {
        List<Long> potentialMatchIds =
                judgementRepository.findPotentialMatchIdsByJudgeIdAndAcceptedTrue(judgeId);
        return potentialMatchIds.stream()
                .filter(
                        potentialMatchId ->
                                !judgementRepository
                                        .findByJudgeIdAndPotentialMatchIdAndAcceptedTrue(
                                                potentialMatchId, judgeId)
                                        .isEmpty())
                .toList();
    }
}
