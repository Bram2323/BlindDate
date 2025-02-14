package com.brajula.blinddate.entities.judgment;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JudgementService {
    private final JudgementRepository judgementRepository;

    public List<Long> getJudgedIdsByJudgeId(Long judgeId) {
        List<Long> judgedIds = new LinkedList<>();
        List<Judgement> judgementsByJudgeId = judgementRepository.findByJudgeIdEquals(judgeId);
        for (Judgement judgement : judgementsByJudgeId) {
            judgedIds.add(judgement.getJudgedId());
        }
        return judgedIds;
    }

    public List<Long> findMutualMatches(Long judgeId) {
        List<Judgement> userAcceptedMatches =
                judgementRepository.findByJudgeIdAndAccepted(judgeId, true);
        List<Judgement> matchesAcceptedUser =
                judgementRepository.findByJudgedIdAndAccepted(judgeId, true);

        Set<Long> acceptedByUser = new HashSet<>();
        for (Judgement judgement : userAcceptedMatches) {
            acceptedByUser.add(judgement.getJudgedId());
        }
        List<Long> matches = new ArrayList<>();
        for (Judgement judgement : matchesAcceptedUser) {
            if (acceptedByUser.contains(judgement.getJudgeId())) {
                matches.add(judgement.getJudgeId());
            }
        }

        return matches;
    }
}
