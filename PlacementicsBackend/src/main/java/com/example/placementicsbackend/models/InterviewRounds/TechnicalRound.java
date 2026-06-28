package com.example.placementicsbackend.models.interviewrounds;

import com.example.placementicsbackend.models.enums.InterviewMode;
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
public class TechnicalRound {

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "TechnicalRoundInfo_InterviewMode")
    private InterviewMode interviewMode;

    @Column(name = "TechnicalRoundInfo_InterviewDuration")
    private String interviewDuration = "";

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "TechnicalRoundInfo_DSAQuestions")
    private List<DSAQuestion> dsaQuestions = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "TechnicalRoundInfo_CoreCSQuestions")
    private List<CoreCSQuestion> coreCsQuestions = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "TechnicalRoundInfo_SystemDesignQuestions")
    private List<SystemDesignQuestion> systemDesignQuestions = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "TechnicalRoundInfo_PuzzleBasedQuestions")
    private List<PuzzleBasedQuestion> puzzleBasedQuestions = new ArrayList<>();
}
