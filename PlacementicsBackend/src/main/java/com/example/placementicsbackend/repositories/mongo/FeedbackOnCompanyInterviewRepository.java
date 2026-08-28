package com.example.placementicsbackend.repositories.mongo;

import com.example.placementicsbackend.models.mongoDB.FeedbackOnCompanyInterview;
import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackOnCompanyInterviewRepository
        extends MongoRepository<FeedbackOnCompanyInterview, String> {

    List<FeedbackOnCompanyInterview> findByCollegeCompanyId(
            String collegeCompanyId
    );

    List<FeedbackOnCompanyInterview> findByAlumniId(String alumniId);

    List<FeedbackOnCompanyInterview> findByStatus(FeedbackStatus status);

    List<FeedbackOnCompanyInterview> findByCollegeCompanyIdAndAlumniId(
            String collegeCompanyId,
            String alumniId
    );
}