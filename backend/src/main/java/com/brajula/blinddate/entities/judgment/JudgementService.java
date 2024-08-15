package com.brajula.blinddate.entities.judgment;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JudgementService {
    private final JudgementRepository judgementRepository;

    public List<Judgement> getByJudgeId(Long judgeId) {
        return judgementRepository.findByJudgeIdEquals(judgeId);
    }
}
