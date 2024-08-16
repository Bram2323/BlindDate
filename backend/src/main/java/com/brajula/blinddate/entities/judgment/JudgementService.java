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
            judgedIds.add(judgement.getJudgedId());
        }
        return judgedIds;
    }
}
