package com.example.placementicsbackend.models.FeedBacks;

import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.Enums.JobType;
import com.example.placementicsbackend.models.Enums.WorkMode;
import com.example.placementicsbackend.models.InterviewRounds.CodingRound;
import com.example.placementicsbackend.models.InterviewRounds.HRRound;
import com.example.placementicsbackend.models.InterviewRounds.Resources;
import com.example.placementicsbackend.models.InterviewRounds.TechnicalRound;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "alumnifeedbackoncompany")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlumniFeedBackonCompany {

    @Id
    @Column(name = "Id")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CompanyId", referencedColumnName = "CompanyId")
    private Company company;

    @Column(name = "AlumniId", nullable = false)
    private String alumniId;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "Id", referencedColumnName = "Id")
    private Alumni alumni;

    @Column(name = "JobProfile", nullable = false)
    private String jobProfile = "";

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "JobType", nullable = false)
    private JobType jobType;

    @Column(name = "JobLocation", nullable = false)
    private String jobLocation = "";

    @Column(name = "CTC", nullable = false)
    private String ctc = "";

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "WorkMode", nullable = false)
    private WorkMode workMode;

    @Embedded
    private CodingRound codingRoundInfo;

    @Embedded
    private TechnicalRound technicalRoundInfo;

    @Embedded
    private HRRound hrRoundInfo;

    @Embedded
    private Resources resourcesInfo;
}
