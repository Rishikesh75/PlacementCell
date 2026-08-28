package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.feedback.FeedbackOnCompanyInterviewRequest;
import com.example.placementicsbackend.dto.feedback.FeedbackOnCompanyInterviewResponse;
import com.example.placementicsbackend.dto.feedback.InterviewRoundDto;
import com.example.placementicsbackend.models.mongoDB.FeedbackOnCompanyInterview;
import com.example.placementicsbackend.models.mongoDB.InterviewRound;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class FeedbackOnCompanyInterviewMapper {

    public FeedbackOnCompanyInterview toEntity(
            FeedbackOnCompanyInterviewRequest request
    ) {
        return FeedbackOnCompanyInterview.builder()
                .collegeCompanyId(request.collegeCompanyId())
                .alumniId(request.alumniId())
                .info(request.info() == null
                        ? Collections.emptyList()
                        : request.info().stream()
                                .map(this::toEntity)
                                .toList())
                .status(request.status())
                .build();
    }

    public FeedbackOnCompanyInterviewResponse toResponse(
            FeedbackOnCompanyInterview feedback
    ) {
        List<InterviewRoundDto> rounds = feedback.getInfo() == null
                ? Collections.emptyList()
                : feedback.getInfo().stream()
                        .map(this::toDto)
                        .toList();

        return new FeedbackOnCompanyInterviewResponse(
                feedback.getId(),
                feedback.getCollegeCompanyId(),
                feedback.getAlumniId(),
                rounds,
                feedback.getStatus()
        );
    }

    private InterviewRound toEntity(InterviewRoundDto dto) {
        return InterviewRound.builder()
                .heading(dto.heading())
                .questions(dto.questions() == null
                        ? Collections.emptyList()
                        : dto.questions())
                .build();
    }

    private InterviewRoundDto toDto(InterviewRound round) {
        return new InterviewRoundDto(
                round.getHeading(),
                round.getQuestions()
        );
    }
}