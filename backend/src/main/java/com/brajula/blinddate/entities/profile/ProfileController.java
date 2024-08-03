package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.user.User;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.PROFILES)
public class ProfileController {
    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<List<GetProfileDto>> getAll() {
        return ResponseEntity.ok(profileService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Profile> create(
            @RequestBody PostProfileDto dto, Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        Profile savedProfile = profileService.save(dto, user);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(savedProfile.getId())
                        .toUri();
        return ResponseEntity.created(location).body(savedProfile);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Profile> update(
            @PathVariable Long id, @RequestBody PostProfileDto patch) {
        return ResponseEntity.ok(profileService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Profile> delete(@PathVariable Long id) {
        profileService.delete(id);
        return ResponseEntity.ok().build();
    }
}
