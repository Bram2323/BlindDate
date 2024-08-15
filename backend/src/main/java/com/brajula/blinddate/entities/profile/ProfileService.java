package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.ImageRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityService;
import com.brajula.blinddate.entities.trait.Trait;
import com.brajula.blinddate.entities.trait.TraitService;
import com.brajula.blinddate.entities.trait.profiletraits.Answer;
import com.brajula.blinddate.entities.trait.profiletraits.PostProfileTraitDto;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTrait;
import com.brajula.blinddate.entities.trait.profiletraits.ProfileTraitService;
import com.brajula.blinddate.entities.user.User;
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.exceptions.UserNotFoundException;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
    private final UserRepository userRepository;

    public List<GetProfileDto> getAll(String searchGender) {
        Specification<Profile> specification = Specification.where(null);
        if (searchGender != null) {
            // add to spec
        }

        return profileRepository.findAll().stream()
                .map(GetProfileDto::from)
                .collect(Collectors.toList());
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
            // set imageId to user object
            User getUser =
                    userRepository
                            .findByUsernameIgnoreCase(user.getUsername())
                            .orElseThrow(UserNotFoundException::new);
            userRepository.save(getUser);
            return profileRepository.save(profile);
        }
    }

    public Profile update(Long id, PatchProfileDto patch) {
        Profile patchedProfile = profileRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.description() != null && !patch.description().isBlank())
            patchedProfile.setDescription(patch.description());
        if (patch.imageId() != null)
            patchedProfile.setImage(
                    imageRepository.findById(patch.imageId()).orElseThrow(NotFoundException::new));
        if (patch.gender() != null && !patch.gender().isBlank())
            patchedProfile.setGender(convertToGender(patch.gender()));
        if (patch.lookingForGender() != null && !patch.lookingForGender().isBlank())
            patchedProfile.setLookingForGender(convertToGender(patch.lookingForGender()));
        if (patch.sexualities() != null)
            patchedProfile.setSexualities(convertToSexualities(patch.sexualities()));
        if (patch.traits() != null)
            patchedProfile.setProfileTraits(convertToProfileTraits(patch.traits()));
        if (patch.interests() != null)
            patchedProfile.setInterests(convertToInterests(patch.interests()));
        if (patch.dateOfBirth() != null) patchedProfile.setDateOfBirth(patch.dateOfBirth());
        profileRepository.save(patchedProfile);
        return patchedProfile;
    }

    public Gender convertToGender(String value) {
        try {
            return Gender.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("gender not valid");
        }
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
