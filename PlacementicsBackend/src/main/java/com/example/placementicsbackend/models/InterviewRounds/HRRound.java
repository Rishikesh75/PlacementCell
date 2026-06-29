package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.InterviewMode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HRRound {

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "HRRoundInfo_InterviewMode")
    private InterviewMode interviewMode;

    @Column(name = "HRRoundInfo_InterviewDuration")
    private String interviewDuration = "";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "HRRoundInfo_SituationBasedQuestions")
    private List<SituationBasedQuestion> situationBasedQuestions = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "HRRoundInfo_UnExpectedQuestions")
    private List<UnExpectedQuestion> unexpectedQuestions = new ArrayList<>();
}
