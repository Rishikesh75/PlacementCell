package com.example.placementicsbackend.models.JobOpening;

import com.example.placementicsbackend.models.Teacher;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacherresearchopening")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearchOpening {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer recordId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id", referencedColumnName = "Id")
    private Teacher teacher;

    @Column(name = "Title", nullable = false)
    private String title = "";

    @Column(name = "Description", nullable = false)
    private String description = "";

    @Column(name = "Department", nullable = false)
    private String department = "";

    @Column(name = "Researcharea", nullable = false)
    private String researchArea = "";

    @Column(name = "Stipend", nullable = false)
    private String stipend = "";

    @Column(name = "Duration", nullable = false)
    private String duration = "";

    @Column(name = "PostedDate", nullable = false)
    private LocalDate postedDate;

    @Column(name = "DeadLine")
    private LocalDate deadline;

    @Column(name = "Link", nullable = false)
    private String link = "";

    @Column(name = "IsActive", nullable = false)
    private boolean active = true;
}
