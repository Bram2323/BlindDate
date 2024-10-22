package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.Routes;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.exceptions.ForbiddenException;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "${blinddate.cors}")
@RequestMapping(Routes.PROFILES)
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);
    private final ProfileService profileService;
    private final UserRepository userRepository;

    @GetMapping("/judge-list")
    public ResponseEntity<List<GetProfileMinimalDto>> getAllProfilesToJudge(
            Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new NotFoundException();
        } else {
            return ResponseEntity.ok(profileService.getAllProfilesToJudge(user));
        }
    }

    @GetMapping("/matches")
    public List<MatchDto> getMatches(Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            logger.error("user is null!");
            throw new NotFoundException();
        } else {
            return profileService.getMatches(user);
        }
    }

    @GetMapping("/{id}")
    public GetProfileDto getByUser(@PathVariable UUID id, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);

        return GetProfileDto.from(profileService.getByUser(user));
    }

    @GetMapping("/my")
    public GetProfileDto getOwnProfile(Authentication authentication) {
        User user = authentication == null ? null : (User) authentication.getPrincipal();
        if (user == null) {
            throw new NotFoundException();
        } else {
            return GetProfileDto.from(profileService.getByUser(user));
        }
    }

    @PostMapping
    public ResponseEntity<GetProfileDto> create(
            @RequestBody PostProfileDto dto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Profile savedProfile = profileService.save(dto, user);
        URI location =
                ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/id")
                        .buildAndExpand(user.getId())
                        .toUri();
        return ResponseEntity.created(location).body(GetProfileDto.from(savedProfile));
    }

    @PatchMapping("/{id}")
    public GetProfileDto update(
            @PathVariable Long id,
            @RequestBody PatchProfileDto patch,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Profile profile = profileService.getById(id);
        if (!profile.getUser().equals(user)) throw new ForbiddenException();
        return GetProfileDto.from(profileService.update(id, patch));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Profile profile = profileService.getById(id);
        if (!profile.getUser().equals(user)) throw new ForbiddenException();
        profileService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
