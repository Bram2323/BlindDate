package com.brajula.blinddate.entities.trait;

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
@RequestMapping(Routes.TRAITS)
public class TraitController {
    private final TraitService traitService;

    @GetMapping
    public ResponseEntity<List<Trait>> getAll() {
        return ResponseEntity.ok(traitService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trait> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(traitService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Trait> create(@RequestBody PostTraitDto dto) {
        Trait trait = dto.toQuestion();
        traitService.save(trait);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(trait.getId())
                        .toUri();
        return ResponseEntity.created(location).body(trait);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Trait> update(@PathVariable Long id, @RequestBody Trait patch) {
        return ResponseEntity.ok(traitService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Trait> delete(@PathVariable Long id) {
        traitService.delete(id);
        return ResponseEntity.ok().build();
    }
}
