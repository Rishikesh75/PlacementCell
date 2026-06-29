package com.example.placementicsbackend.dtos;

import com.example.placementicsbackend.models.Enums.JobType;
import com.example.placementicsbackend.models.Enums.WorkMode;
import com.example.placementicsbackend.models.InterviewRounds.CodingRound;
import com.example.placementicsbackend.models.InterviewRounds.HRRound;
import com.example.placementicsbackend.models.InterviewRounds.Resources;
import com.example.placementicsbackend.models.InterviewRounds.TechnicalRound;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniFeedbackOnCompanyCreateDto {

    private String companyId = "";
    private String id = "";
    private String jobProfile = "";
    private String ctc = "";
    private String jobLocation = "";
    private JobType jobType = JobType.Internship;
    private WorkMode workMode = WorkMode.Remote;
    private CodingRound codingRoundInfo;
    private TechnicalRound technicalRoundInfo;
    private HRRound hrRoundInfo;
    private Resources resourcesInfo;
}
