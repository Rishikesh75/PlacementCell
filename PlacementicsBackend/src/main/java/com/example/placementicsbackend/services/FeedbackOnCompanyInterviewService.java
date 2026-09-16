package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.feedback.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.FeedbackOnCompanyInterviewMapper;
import com.example.placementicsbackend.models.mongoDB.FeedbackOnCompanyInterview;
import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import com.example.placementicsbackend.repositories.mongo.FeedbackOnCompanyInterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FeedbackOnCompanyInterviewService {

    private final FeedbackOnCompanyInterviewRepository repository;
    private final FeedbackOnCompanyInterviewMapper mapper;
    private final CollegeCompanyRepository collegeCompanyRepository;
    private final MongoTemplate mongoTemplate;

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

            public List<FeedbackOnCompanyInterviewResponse> findPendingByCollege(
                UUID collegeId
            ) {
            List<String> collegeCompanyIds = collegeCompanyRepository
                .findByCollegeId(collegeId)
                .stream()
                .map(collegeCompany -> collegeCompany.getId().toString())
                .toList();

            if (collegeCompanyIds.isEmpty()) {
                return List.of();
            }

            return repository
                .findByCollegeCompanyIdInAndStatus(
                    collegeCompanyIds,
                    FeedbackStatus.PENDING
                )
                .stream()
                .map(mapper::toResponse)
                .toList();
            }

            public List<FeedbackOnCompanyInterviewResponse> findApprovedByCollege(
                UUID collegeId
            ) {
            List<String> collegeCompanyIds = collegeCompanyRepository
                .findByCollegeId(collegeId)
                .stream()
                .map(collegeCompany -> collegeCompany.getId().toString())
                .toList();

            if (collegeCompanyIds.isEmpty()) {
                return List.of();
            }

            return repository
                .findByCollegeCompanyIdInAndStatus(
                    collegeCompanyIds,
                    FeedbackStatus.APPROVED
                )
                .stream()
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

    public FeedbackOnCompanyInterviewResponse updateStatus(
            String id,
            FeedbackStatus status
    ) {
        // Verify the document exists first so we return 404 if the id is wrong.
        getFeedback(id);

        // Use an atomic field-level update so we never re-insert the document,
        // which would cause a DuplicateKeyException if any unique index exists.
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("status", status);
        mongoTemplate.updateFirst(query, update, FeedbackOnCompanyInterview.class);

        return mapper.toResponse(getFeedback(id));
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