package com.brajula.blinddate.domain.profile;

import com.brajula.blinddate.domain.sexuality.Sexuality;
import com.brajula.blinddate.domain.sexuality.SexualityService;

import jakarta.persistence.EntityNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final SexualityService sexualityService;

    public List<Profile> getAll() {
        return profileRepository.findAll();
    }

    public Profile getById(Long id) {
        return profileRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Profile save(ProfileDto dto) {
        Profile profile = dto.toProfile();
        profile.setSexualities(convertToSexualities(dto.sexualities()));
        return profileRepository.save(profile);
    }

    public Profile update(Long id, ProfileDto patch) {
        Profile patchedProfile =
                profileRepository.findById(id).orElseThrow(EntityNotFoundException::new);
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
        profileRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        profileRepository.deleteById(id);
    }
}
