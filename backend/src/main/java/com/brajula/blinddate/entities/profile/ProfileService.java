package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.ImageRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.sexuality.Sexuality;
import com.brajula.blinddate.entities.sexuality.SexualityService;
import com.brajula.blinddate.entities.specification.ProfileSpecification;
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

    public List<GetProfileDto> getAll(
            String gender,
            Integer minAge,
            Integer maxAge,
            List<Long> preferences,
            Priority priority) {
        Specification<Profile> specification = Specification.where(null);
        if (gender != null) {
            if (!gender.equalsIgnoreCase(Gender.OTHER.toString())) {
                specification =
                        specification.and(
                                ProfileSpecification.hasGender(
                                        Gender.valueOf(gender.toUpperCase())));
            }
        }
        if (minAge != null && maxAge != null) {
            specification =
                    specification.and(
                            ProfileSpecification.hasAgeBetween((minAge - 1), (maxAge + 1)));
        }

        if (priority != null) {
            if (priority == Priority.PREFERENCES) {
                // todo preferences ordenen op meeste overeenkomsten
                System.out.println("Sort by most similar preferences");
            }
            if (priority == Priority.INTERESTS) {
                // todo interests ordenen op meeste overeenkomsten
                System.out.println("Sort by most similar interests");
            }
            if (priority == Priority.TRAITS) {
                // todo traits ordenen op meeste overeenkomsten
                System.out.println("Sort by most similar traits");
            }
            // todo interests ordenen op meeste overeenkomsten

            // todo profiletraits ordenen op meeste overeenkomsten
        }
        return profileRepository.findAll(specification).stream()
                .map(GetProfileDto::toDto)
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
            return profileRepository.save(profile);
        }
    }

    public Profile update(Long id, PatchProfileDto patch) {
        Profile patchedProfile =
                profileRepository
                        .findById(id)
                        .orElseThrow(() -> new BadRequestException("Cannot find profile"));
        if (patch.description() != null) patchedProfile.setDescription(patch.description());
        if (patch.imageId() != null)
            patchedProfile.setImage(
                    imageRepository.findById(patch.imageId()).orElseThrow(NotFoundException::new));
        if (patch.gender() != null) patchedProfile.setGender(convertToGender(patch.gender()));
        if (patch.lookingForGender() != null)
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
