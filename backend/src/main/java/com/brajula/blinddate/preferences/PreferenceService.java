package com.brajula.blinddate.preferences;

import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PreferenceService {
    private final PreferenceRepository preferenceRepository;

    public List<Preference> getAll() {
        return preferenceRepository.findAll();
    }

    public Preference getById(Long id) {
        return preferenceRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(Preference preference) {
        preferenceRepository.save(preference);
    }

    public Preference update(Long id, Preference patch) {
        Preference patchedPreference =
                preferenceRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.getName() != null) patchedPreference.setName(patch.getName());
        preferenceRepository.save(patchedPreference);
        return patchedPreference;
    }

    public void delete(Long id) {
        preferenceRepository.findById(id).orElseThrow(NotFoundException::new);
        preferenceRepository.deleteById(id);
    }
}
