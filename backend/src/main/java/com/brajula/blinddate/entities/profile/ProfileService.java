package com.brajula.blinddate.entities.profile;

import com.brajula.blinddate.entities.images.ImageRepository;
import com.brajula.blinddate.entities.interest.Interest;
import com.brajula.blinddate.entities.interest.InterestService;
import com.brajula.blinddate.entities.judgment.JudgementService;
import com.brajula.blinddate.entities.preferences.Preference;
import com.brajula.blinddate.entities.preferences.PreferenceService;
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
import com.brajula.blinddate.entities.user.UserRepository;
import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.NotFoundException;
import com.brajula.blinddate.exceptions.UserNotFoundException;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final SexualityService sexualityService;
    private final ImageRepository imageRepository;
    private final InterestService interestService;
    private final ProfileTraitService profileTraitService;
    private final TraitService traitService;
    private final JudgementService judgementService;

    private final PreferenceService preferenceService;

    private final UserRepository userRepository;

    public List<GetProfileDto> getAll() {
        return profileRepository.findAll().stream().map(GetProfileDto::from).toList();
    }

    // overloaded get all
    public List<GetProfileDto> getAll(User user) {
        Profile userProfile = getUserProfile(user);
        Specification<Profile> specification = Specification.where(null);
        if (userProfile.getLookingForGender() != null
                && !userProfile.getLookingForGender().isEmpty()) {
            specification =
                    specification.and(
                            ProfileSpecification.hasGender(userProfile.getLookingForGender()));
        }
        if (userProfile.getMinAge() != null && userProfile.getMaxAge() != null) {
            specification =
                    specification.and(
                            ProfileSpecification.hasAgeBetween(
                                    (userProfile.getMinAge() - 1), (userProfile.getMaxAge() + 1)));
        }

        List<Profile> filteredProfiles =
                profileRepository.findAll(specification).stream()
                        .filter((profile) -> profile.getUser().isEnabled())
                        .toList();

        return calculateMatchScore(userProfile, filteredProfiles);
    }

    public List<GetProfileDto> getAllProfilesToJudge(User user) {
        Profile userProfile = getUserProfile(user);
        List<Long> judgedProfileIds = judgementService.getJudgedIdsByJudgeId(userProfile.getId());
        return getAll(user).stream()
                .filter((profile) -> !judgedProfileIds.contains(profile.id()))
                .toList();
    }

    public List<GetProfileDto> getMatches(User user) {
        Profile userProfile = getUserProfile(user);
        List<Long> matchIdList = judgementService.findMutualMatches(userProfile.getId());
        List<Profile> profileMatches = matchIdList.stream().map(this::getById).toList();
        return profileMatches.stream().map(GetProfileDto::from).toList();
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

            profile.setPreferences(convertToPreferences(dto.preferences()));

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
        if (patch.gender() != null) patchedProfile.setGender(convertToGender(patch.gender()));
        List<Gender> converted = new ArrayList<>();
        if (patch.lookingForGender() != null && !patch.lookingForGender().isEmpty())
            for (String gender : patch.lookingForGender()) {
                converted.add(convertToGender(gender));
            }
        patchedProfile.setLookingForGender(converted);
        if (patch.sexualities() != null)
            patchedProfile.setSexualities(convertToSexualities(patch.sexualities()));
        if (patch.preferences() != null)
            patchedProfile.setPreferences(convertToPreferences(patch.preferences()));
        if (patch.traits() != null)
            patchedProfile.setProfileTraits(convertToProfileTraits(patch.traits()));
        if (patch.interests() != null)
            patchedProfile.setInterests(convertToInterests(patch.interests()));
        if (patch.dateOfBirth() != null) patchedProfile.setDateOfBirth(patch.dateOfBirth());
        if (patch.minAge() != null) patchedProfile.setMinAge(patch.minAge());
        if (patch.maxAge() != null) patchedProfile.setMaxAge(patch.maxAge());
        profileRepository.save(patchedProfile);
        return patchedProfile;
    }

    public void delete(Long id) {
        profileRepository.findById(id).orElseThrow(NotFoundException::new);
        profileRepository.deleteById(id);
    }

    // helper methods
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

    public Set<Preference> convertToPreferences(List<Long> preferenceIdList) {
        Set<Preference> preferences = new HashSet<>();
        for (Long id : preferenceIdList) {
            preferences.add(preferenceService.getById(id));
        }
        return preferences;
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

    public List<GetProfileDto> calculateMatchScore(
            Profile userProfile, List<Profile> filteredProfiles) {
        List<GetProfileDto> getProfileDtoList = new ArrayList<>();
        for (Profile profile : filteredProfiles) {
            if (!profile.equals(userProfile)) {
                int matchScore = 0;
                for (Preference preference : profile.getPreferences()) {
                    if (userProfile.getPreferences().contains(preference)) {
                        matchScore++;
                    }
                }
                for (Sexuality sexuality : profile.getSexualities()) {
                    if (userProfile.getSexualities().contains(sexuality)) {
                        matchScore++;
                    }
                }
                for (Interest interest : profile.getInterests()) {
                    if (userProfile.getInterests().contains(interest)) {
                        matchScore++;
                    }
                }
                for (ProfileTrait profileTrait : profile.getProfileTraits()) {
                    List<ProfileTrait> similarProfileTraits =
                            userProfile.getProfileTraits().stream()
                                    .filter(
                                            userProfileTrait ->
                                                    userProfileTrait.getTrait()
                                                                    == profileTrait.getTrait()
                                                            && userProfileTrait.getAnswer()
                                                                    == profileTrait.getAnswer())
                                    .toList();
                    matchScore += similarProfileTraits.size();
                }
                GetProfileDto dto = GetProfileDto.from(profile, matchScore);
                getProfileDtoList.add(dto);
            }
        }

        getProfileDtoList.sort(Comparator.comparingInt(GetProfileDto::matchScore).reversed());
        return getProfileDtoList;
    }

    public Profile getUserProfile(User user) {
        return profileRepository.findByUser(user).orElseThrow(NotFoundException::new);
    }
}
