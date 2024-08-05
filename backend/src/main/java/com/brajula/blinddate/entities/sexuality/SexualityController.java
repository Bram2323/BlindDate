package com.brajula.blinddate.entities.sexuality;

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
@RequestMapping(Routes.SEXUALITIES)
public class SexualityController {
    private final SexualityService sexualityService;

    @GetMapping
    public ResponseEntity<List<Sexuality>> getAll() {
        return ResponseEntity.ok(sexualityService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sexuality> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(sexualityService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Sexuality> create(@RequestBody SexualityCreationDto dto) {
        Sexuality sexuality = dto.toSexuality();
        sexualityService.save(sexuality);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(sexuality.getId())
                        .toUri();
        return ResponseEntity.created(location).body(sexuality);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Sexuality> update(@PathVariable Long id, @RequestBody Sexuality patch) {
        return ResponseEntity.ok(sexualityService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Sexuality> delete(@PathVariable Long id) {
        sexualityService.delete(id);
        return ResponseEntity.ok().build();
    }
}
