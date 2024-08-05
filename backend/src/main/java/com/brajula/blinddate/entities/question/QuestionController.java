package com.brajula.blinddate.entities.question;

import com.brajula.blinddate.Routes;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.QUESTIONS)
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<List<Question>> getAll() {
        return ResponseEntity.ok(questionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Question> create(@RequestBody QuestionCreationDto dto) {
        Question question = dto.toQuestion();
        questionService.save(question);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(question.getId())
                        .toUri();
        return ResponseEntity.created(location).body(question);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Question> update(@PathVariable Long id, @RequestBody Question patch) {
        return ResponseEntity.ok(questionService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Question> delete(@PathVariable Long id) {
        questionService.delete(id);
        return ResponseEntity.ok().build();
    }
}
