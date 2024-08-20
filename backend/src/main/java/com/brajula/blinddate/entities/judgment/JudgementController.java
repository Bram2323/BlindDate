package com.brajula.blinddate.entities.judgment;

import com.brajula.blinddate.Routes;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.JUDGEMENTS)
public class JudgementController {
    private final JudgementRepository judgementRepository;
    private final JudgementService judgementService;

    @PostMapping
    public ResponseEntity<Judgement> postJudgement(
            @RequestBody Judgement judgement, UriComponentsBuilder ucb) {
        Judgement savedJudgement = judgementRepository.save(judgement);
        URI location = ucb.path("judgement/{id}").buildAndExpand(savedJudgement.getId()).toUri();
        return ResponseEntity.created(location).body(savedJudgement);
    }

    @GetMapping("/{id}")
    public List<Long> getJudgedIdsByJudgeId(@PathVariable Long id) {
        return judgementService.getJudgedIdsByJudgeId(id);
    }
}
