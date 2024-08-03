package com.brajula.blinddate.entities.interest;

import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterestService {
    private final InterestRepository interestRepository;

    public List<Interest> getAll() {
        return interestRepository.findAll();
    }

    public Interest getById(Long id) {
        return interestRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(Interest interest) {
        interestRepository.save(interest);
    }

    public Interest update(Long id, Interest patch) {
        Interest patchedInterest =
                interestRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.getName() != null) patchedInterest.setName(patch.getName());
        interestRepository.save(patchedInterest);
        return patchedInterest;
    }

    public void delete(Long id) {
        interestRepository.findById(id).orElseThrow(NotFoundException::new);
        interestRepository.deleteById(id);
    }
}
