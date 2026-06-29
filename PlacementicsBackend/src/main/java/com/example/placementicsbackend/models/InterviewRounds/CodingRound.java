package com.example.placementicsbackend.models.InterviewRounds;

import com.example.placementicsbackend.models.Enums.CodingPlatform;
import com.example.placementicsbackend.models.Enums.DifficultyLevel;
import com.example.placementicsbackend.models.Enums.InterviewMode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalTime;
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
public class CodingRound {

    @Enumerated(EnumType.STRING)
    @Column(name = "CodingRoundInfo_CodingPlatform")
    private CodingPlatform codingPlatform = CodingPlatform.Other;

    @Column(name = "CodingRoundInfo_Duration")
    private LocalTime duration;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "CodingRoundInfo_Questions")
    private List<String> questions = new ArrayList<>();

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "CodingRoundInfo_DifficultyLevel")
    private DifficultyLevel difficultyLevel;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "CodingRoundInfo_InterviewMode")
    private InterviewMode interviewMode;
}
