package com.brajula.blinddate.entities.judgment;

import com.brajula.blinddate.entities.profile.ProfileController;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JudgementService {
    private final JudgementRepository judgementRepository;
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    public List<Long> getJudgedIdsByJudgeId(Long judgeId) {
        List<Long> judgedIds = new LinkedList<>();
        List<Judgement> judgementsByJudgeId = judgementRepository.findByJudgeIdEquals(judgeId);
        for (Judgement judgement : judgementsByJudgeId) {
            judgedIds.add(judgement.getJudgedId());
        }
        return judgedIds;
    }

    public List<Long> findMutualMatches(Long judgeId) {
        List<Long> potentialMatchIds =
                judgementRepository.findByJudgedIdAndJudgeIdAndAcceptedTrue(judgeId);
        logger.debug("potential match ids: " + potentialMatchIds);
        logger.debug("Judge id: " + judgeId);
        return potentialMatchIds.stream()
                .filter(
                        potentialMatchId ->
                                !judgementRepository
                                        .findByJudgeIdAndJudgedIdAndAcceptedTrue(
                                                potentialMatchId, judgeId)
                                        .isEmpty())
                .toList();
    }
}
