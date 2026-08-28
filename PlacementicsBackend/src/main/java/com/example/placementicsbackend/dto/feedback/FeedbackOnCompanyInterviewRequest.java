package com.example.placementicsbackend.dto.feedback;

import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record FeedbackOnCompanyInterviewRequest(
        @NotBlank
        String collegeCompanyId,

        @NotBlank
        String alumniId,

        List<InterviewRoundDto> info,

        @NotNull
        FeedbackStatus status
) {
}