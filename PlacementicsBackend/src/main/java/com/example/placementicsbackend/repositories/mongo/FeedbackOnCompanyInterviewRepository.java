package com.example.placementicsbackend.repositories.mongo;

import com.example.placementicsbackend.models.mongoDB.FeedbackOnCompanyInterview;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackOnCompanyInterviewRepository
        extends MongoRepository<FeedbackOnCompanyInterview, String> {
}
