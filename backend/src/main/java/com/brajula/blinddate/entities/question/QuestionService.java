package com.brajula.blinddate.entities.question;

import com.brajula.blinddate.exceptions.NotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public List<Question> getAll() {
        return questionRepository.findAll();
    }

    public Question getById(Long id) {
        return questionRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public void save(Question question) {
        questionRepository.save(question);
    }

    public Question update(Long id, Question patch) {
        Question patchedQuestion =
                questionRepository.findById(id).orElseThrow(NotFoundException::new);
        if (patch.getQuestion() != null) patchedQuestion.setQuestion(patch.getQuestion());
        questionRepository.save(patchedQuestion);
        return patchedQuestion;
    }

    public void delete(Long id) {
        questionRepository.findById(id).orElseThrow(NotFoundException::new);
        questionRepository.deleteById(id);
    }
}
