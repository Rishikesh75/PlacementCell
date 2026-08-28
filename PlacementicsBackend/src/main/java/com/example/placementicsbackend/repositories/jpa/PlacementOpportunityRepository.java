package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.PlacementOpportunity;
import com.example.placementicsbackend.models.enums.OpportunityStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PlacementOpportunityRepository
        extends JpaRepository<PlacementOpportunity, UUID> {

    List<PlacementOpportunity> findByCollegeCompanyIdOrderByDeadlineAsc(
            UUID collegeCompanyId
    );

    List<PlacementOpportunity> findByStatusOrderByDeadlineAsc(
            OpportunityStatus status
    );

    List<PlacementOpportunity> findByTeacherIdOrderByDeadlineAsc(UUID teacherId);

    List<PlacementOpportunity> findByAlumniIdOrderByDeadlineAsc(UUID alumniId);

    List<PlacementOpportunity> findAllByOrderByDeadlineAsc();
}