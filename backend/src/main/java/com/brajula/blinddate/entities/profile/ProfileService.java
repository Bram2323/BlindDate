package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.ImageRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.judgment.JudgementService;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityService;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.trait.TraitService;
import com.brajula.blinddate.entities.trait.profiletraits.Answer;
import com.brajula.blinddate.entities.trait.profiletraits.PostProfileTraitDto;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTraitService;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.NotFoundException;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private static final Logger logger = LoggerFactory.getLogger(ProfileService.class);
    private final ProfileRepository profileRepository;
    private final SexualityService sexualityService;
    private final ImageRepository imageRepository;
    private final InterestService interestService;
    private final ProfileTraitService profileTraitService;
    private final TraitService traitService;
    private final JudgementService judgementService;

    public List<GetProfileDto> getAll() {
        return profileRepository.findAll().stream()
                .map(GetProfileDto::toDto)
                .collect(Collectors.toList());
    }

    public List<JudgeProfileDto> getAllProfilesToJudge(Long currentProfileId) {
        List<Long> judgedProfileIds = judgementService.getJudgedIdsByJudgeId(currentProfileId);
        List<Profile> excludingCurrentProfile = findAllExcludingCurrentProfile(currentProfileId);
        List<Profile> profilesToJudge = new LinkedList<>();

        if (judgedProfileIds.isEmpty()) {
            profilesToJudge = excludingCurrentProfile;
        } else {
            for (Profile profile : excludingCurrentProfile) {
                if (!judgedProfileIds.contains(profile.id)) {
                    profilesToJudge.add(profile);
                }
            }
        }

        return profilesToJudge.stream().map(JudgeProfileDto::toDto).collect(Collectors.toList());
    }

    private List<Profile> findAllExcludingCurrentProfile(Long currentProfileId) {
        List<Profile> excludingCurrentProfile = new LinkedList<>();
        for (Profile profile : profileRepository.findAll()) {
            if (!currentProfileId.equals(profile.id)) {
                excludingCurrentProfile.add(profile);
            }
        }
        return excludingCurrentProfile;
    }

    public Profile getById(Long id) {
        return profileRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public Profile getByUser(User user) {
        return profileRepository.findByUser(user).orElseThrow(NotFoundException::new);
    }

    @Transactional
    public Profile save(PostProfileDto dto, User user) {
        Optional<Profile> profileExists = profileRepository.findByUser(user);
        if (profileExists.isPresent()) {
            throw new BadRequestException("This profile already exists");
        } else {
            Profile profile = dto.toProfile(user);
            profile.setImage(
                    imageRepository.findById(dto.imageId()).orElseThrow(NotFoundException::new));
            profile.setSexualities(convertToSexualities(dto.sexualities()));
            profile.setInterests(convertToInterests(dto.interests()));
            profile.setProfileTraits(convertToProfileTraits(dto.traits()));
            return profileRepository.save(profile);
        }
    }

    public Profile update(Long id, PostProfileDto patch) {
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

    public Set<Interest> convertToInterests(List<Long> interestIdList) {
        Set<Interest> interests = new HashSet<>();
        for (Long id : interestIdList) {
            interests.add(interestService.getById(id));
        }
        return interests;
    }

    public Set<ProfileTrait> convertToProfileTraits(List<PostProfileTraitDto> profileTraitList) {
        Set<ProfileTrait> traits = new HashSet<>();
        for (PostProfileTraitDto pf : profileTraitList) {
            Trait trait = traitService.getById(pf.id());
            Answer answer;
            try {
                answer = Answer.valueOf(pf.answer().toUpperCase().replace(" ", "_"));
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("answer not valid");
            }
            ProfileTrait profileTrait = new ProfileTrait(trait, answer);
            profileTraitService.save(profileTrait);
            traits.add(profileTrait);
        }
        return traits;
    }

    public void delete(Long id) {
        profileRepository.findById(id).orElseThrow(NotFoundException::new);
        profileRepository.deleteById(id);
    }
}
