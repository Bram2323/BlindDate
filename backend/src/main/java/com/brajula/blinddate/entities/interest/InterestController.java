package com.brajula.blinddate.entities.interest;

import static com.brajula.blinddate.Routes.INTERESTS;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(INTERESTS)
public class InterestController {
    private final InterestService interestService;

    @GetMapping
    public ResponseEntity<List<Interest>> getAll() {
        return ResponseEntity.ok(interestService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interest> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(interestService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Interest> create(@RequestBody Interest interest) {
        interestService.save(interest);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(interest.getId())
                        .toUri();
        return ResponseEntity.created(location).body(interest);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Interest> update(@PathVariable Long id, @RequestBody Interest patch) {
        return ResponseEntity.ok(interestService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Interest> delete(@PathVariable Long id) {
        interestService.delete(id);
        return ResponseEntity.ok().build();
    }
}
