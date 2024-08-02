package com.brajula.blinddate.entities.sexuality;

import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SexualityService {
    private final SexualityRepository sexualityRepository;

    public List<Sexuality> getAll() {
        return sexualityRepository.findAll();
    }

    public Sexuality getById(Long id) {
        return sexualityRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(Sexuality sexuality) {
        sexualityRepository.save(sexuality);
    }

    public Sexuality update(Long id, Sexuality patch) {
        Sexuality patchedSexuality =
                sexualityRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.getName() != null) patchedSexuality.setName(patch.getName());
        sexualityRepository.save(patchedSexuality);
        return patchedSexuality;
    }

    public void delete(Long id) {
        sexualityRepository.findById(id).orElseThrow(NotFoundException::new);
        sexualityRepository.deleteById(id);
    }
}
