package com.brajula.blinddate.entities.judgment;

import com.brajula.blinddate.Routes;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.JUDGEMENTS)
public class JudgementController {
    private final JudgementRepository judgementRepository;
}
