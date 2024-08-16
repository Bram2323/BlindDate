package com.brajula.blinddate.preferences;

import static com.brajula.blinddate.Routes.PREFERENCES;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(PREFERENCES)
public class PreferenceController {
    private final PreferenceService preferenceService;

    @GetMapping
    public ResponseEntity<List<Preference>> getAll() {
        return ResponseEntity.ok(preferenceService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Preference> getAllById(@PathVariable Long id) {
        return ResponseEntity.ok(preferenceService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Preference> create(@RequestBody PreferenceCreationDto dto) {
        Preference preference = dto.toPreference();
        preferenceService.save(preference);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(preference.getId())
                        .toUri();
        return ResponseEntity.created(location).body(preference);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Preference> update(@PathVariable Long id, @RequestBody Preference patch) {
        return ResponseEntity.ok(preferenceService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Preference> delete(@PathVariable Long id) {
        preferenceService.delete(id);
        return ResponseEntity.ok().build();
    }
}
