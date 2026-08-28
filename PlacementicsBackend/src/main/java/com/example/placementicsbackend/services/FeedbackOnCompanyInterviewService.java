package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.feedback.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.FeedbackOnCompanyInterviewMapper;
import com.example.placementicsbackend.models.mongoDB.FeedbackOnCompanyInterview;
import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import com.example.placementicsbackend.repositories.mongo.FeedbackOnCompanyInterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackOnCompanyInterviewService {

    private final FeedbackOnCompanyInterviewRepository repository;
    private final FeedbackOnCompanyInterviewMapper mapper;

    public List<FeedbackOnCompanyInterviewResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public FeedbackOnCompanyInterviewResponse findById(String id) {
        return mapper.toResponse(getFeedback(id));
    }

    public List<FeedbackOnCompanyInterviewResponse> findByStatus(
            FeedbackStatus status
    ) {
        return repository.findByStatus(status).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public FeedbackOnCompanyInterviewResponse create(
            FeedbackOnCompanyInterviewRequest request
    ) {
        FeedbackOnCompanyInterview feedback =
                repository.save(mapper.toEntity(request));

        return mapper.toResponse(feedback);
    }

    public FeedbackOnCompanyInterviewResponse update(
            String id,
            FeedbackOnCompanyInterviewRequest request
    ) {
        FeedbackOnCompanyInterview feedback = getFeedback(id);

        FeedbackOnCompanyInterview updated = mapper.toEntity(request);
        updated.setId(feedback.getId());

        return mapper.toResponse(repository.save(updated));
    }

    public void delete(String id) {
        repository.delete(getFeedback(id));
    }

    private FeedbackOnCompanyInterview getFeedback(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interview feedback not found: " + id
                ));
    }
}