package com.example.placementicsbackend.models.FeedBacks;

import com.example.placementicsbackend.models.CompanyEmployee;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employeefeedbackonstudent")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeFeedbackonStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RecordId")
    private Integer recordId;

    @Column(name = "CompanyEmpId", nullable = false)
    private String companyEmpId = "";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CompanyEmpId", insertable = false, updatable = false)
    private CompanyEmployee companyEmployee;

    @Column(name = "BatchId", nullable = false)
    private String batchId = "";

    @Column(name = "Description", nullable = false)
    private String description = "";
}
