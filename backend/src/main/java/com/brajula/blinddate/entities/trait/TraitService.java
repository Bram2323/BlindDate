package com.brajula.blinddate.entities.trait;

import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TraitService {
    private final TraitRepository traitRepository;

    public List<Trait> getAll() {
        return traitRepository.findAll();
    }

    public Trait getById(Long id) {
        return traitRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(Trait trait) {
        traitRepository.save(trait);
    }

    public Trait update(Long id, Trait patch) {
        Trait patchedTrait = traitRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.getQuestion() != null) patchedTrait.setQuestion(patch.getQuestion());
        traitRepository.save(patchedTrait);
        return patchedTrait;
    }

    public void delete(Long id) {
        traitRepository.findById(id).orElseThrow(NotFoundException::new);
        traitRepository.deleteById(id);
    }
}
