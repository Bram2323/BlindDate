package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityService;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.NotFoundException;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private static final Logger logger = LoggerFactory.getLogger(ProfileService.class);
    private final ProfileRepository profileRepository;
    private final SexualityService sexualityService;
    private final UserRepository userRepository;

    public List<Profile> getAll() {
        return profileRepository.findAll();
    }

    public Profile getById(Long id) {
        return profileRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Transactional
    public Profile save(ProfileDto dto, User user) {
        Optional<Profile> profileExists = profileRepository.findByUser(user);
        if (profileExists.isPresent()) {
            throw new BadRequestException("This profile already exists");
        } else {
            Profile profile = dto.toProfile(user);
            profile.setSexualities(convertToSexualities(dto.sexualities()));
            return profileRepository.save(profile);
        }
    }

    public Profile update(Long id, ProfileDto patch) {
        Profile patchedProfile = profileRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.description() != null) patchedProfile.setDescription(patch.description());
        if (patch.gender() != null)
            patchedProfile.setGender(Gender.valueOf(patch.gender().toUpperCase()));
        if (patch.dateOfBirth() != null) patchedProfile.setDateOfBirth(patch.dateOfBirth());
        if (patch.sexualities() != null)
            patchedProfile.setSexualities(convertToSexualities(patch.sexualities()));
        profileRepository.save(patchedProfile);
        return patchedProfile;
    }

    public Set<Sexuality> convertToSexualities(List<Long> sexualityIdList) {
        Set<Sexuality> sexualities = new HashSet<>();
        for (Long id : sexualityIdList) {
            sexualities.add(sexualityService.getById(id));
        }
        return sexualities;
    }

    public void delete(Long id) {
        profileRepository.findById(id).orElseThrow(NotFoundException::new);
        profileRepository.deleteById(id);
    }
}
