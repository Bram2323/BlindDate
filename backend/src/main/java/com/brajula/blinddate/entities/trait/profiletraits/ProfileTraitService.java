package com.brajula.blinddate.entities.trait.profiletraits;

import com.brajula.blinddate.exceptions.BadRequestException;
import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileTraitService {
    private final ProfileTraitRepository profileTraitRepository;

    public List<ProfileTrait> getAll() {
        return profileTraitRepository.findAll();
    }

    public ProfileTrait getById(Long id) {
        return profileTraitRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(ProfileTrait profileTrait) {
        profileTraitRepository.save(profileTrait);
    }

    public ProfileTrait update(Long id, PatchProfileTraitDto patch) {
        ProfileTrait patchedProfileTrait =
                profileTraitRepository.findById(id).orElseThrow(NotFoundException::new);

        Answer formattedAnswer;
        try {
            formattedAnswer = Answer.valueOf(patch.answer().toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid answer");
        }

        patchedProfileTrait.setAnswer(formattedAnswer);
        profileTraitRepository.save(patchedProfileTrait);
        return patchedProfileTrait;
    }

    public void delete(Long id) {
        profileTraitRepository.findById(id).orElseThrow(NotFoundException::new);
        profileTraitRepository.deleteById(id);
    }
}
