package com.brajula.blinddate.entities.trait.profiletraits;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.trait.TraitRepository;

import lombok.RequiredArgsConstructor;

import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.ANSWERS)
public class ProfileTraitController {
    private final ProfileTraitService profileTraitService;
    private final TraitRepository traitRepository;

    @GetMapping
    public ResponseEntity<List<ProfileTrait>> getAll() {
        return ResponseEntity.ok(profileTraitService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProfileTrait> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(profileTraitService.getById(id));
    }

    @PostMapping
    public ResponseEntity<ProfileTrait> create(@RequestBody PostProfileTraitDto dto)
            throws BadRequestException {
        Trait trait =
                traitRepository.findById(dto.questionId()).orElseThrow(BadRequestException::new);
        ProfileTrait profileTrait = dto.toAnswer(trait);
        profileTraitService.save(profileTrait);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(profileTrait.getId())
                        .toUri();
        return ResponseEntity.created(location).body(profileTrait);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProfileTrait> update(
            @PathVariable Long id, @RequestBody PatchProfileTraitDto patch) {
        return ResponseEntity.ok(profileTraitService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProfileTrait> delete(@PathVariable Long id) {
        profileTraitService.delete(id);
        return ResponseEntity.ok().build();
    }
}
