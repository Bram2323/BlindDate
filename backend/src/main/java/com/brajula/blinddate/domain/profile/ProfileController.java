package com.brajula.blinddate.domain.profile;

import com.brajula.blinddate.Routes;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173"})
@RequestMapping(Routes.PROFILES)
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<List<Profile>> getAll() {
        return ResponseEntity.ok(profileService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Profile> create(@RequestBody ProfileDto dto) {
        Profile savedProfile = profileService.save(dto);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(savedProfile.getId())
                        .toUri();
        return ResponseEntity.created(location).body(savedProfile);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Profile> update(@PathVariable Long id, @RequestBody ProfileDto patch) {
        return ResponseEntity.ok(profileService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Profile> delete(@PathVariable Long id) {
        profileService.delete(id);
        return ResponseEntity.ok().build();
    }
}
