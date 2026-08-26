package com.example.placementicsbackend.models.mongoDB;

import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "feedback_on_company_interview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackOnCompanyInterview {

    @Id
    private String id;

    private String collegeCompanyId;
    private String alumniId;

    @Builder.Default
    private List<InterviewRound> info = new ArrayList<>();

    @Builder.Default
    private FeedbackStatus status = FeedbackStatus.PENDING;
}