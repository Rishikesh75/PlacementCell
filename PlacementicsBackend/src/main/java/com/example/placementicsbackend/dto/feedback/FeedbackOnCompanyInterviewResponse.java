package com.example.placementicsbackend.dto.feedback;

import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;

import java.util.List;

public record FeedbackOnCompanyInterviewResponse(
        String id,
        String collegeCompanyId,
        String alumniId,
        List<InterviewRoundDto> info,
        FeedbackStatus status
) {
}