package com.example.placementicsbackend.dtos;

import com.example.placementicsbackend.models.enums.JobType;
import com.example.placementicsbackend.models.enums.WorkMode;
import com.example.placementicsbackend.models.interviewrounds.CodingRound;
import com.example.placementicsbackend.models.interviewrounds.HRRound;
import com.example.placementicsbackend.models.interviewrounds.Resources;
import com.example.placementicsbackend.models.interviewrounds.TechnicalRound;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniFeedbackOnCompanyDto {

    private String companyName = "";
    private String alumniProfile = "";
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
