package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.CompanyRequest;
import com.example.placementicsbackend.models.enums.CompanyRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompanyRequestRepository extends JpaRepository<CompanyRequest, UUID> {

    List<CompanyRequest> findByCollegeCompanyIdOrderByInterviewRequestedAtAsc(
            UUID collegeCompanyId
    );

    List<CompanyRequest> findByStatusOrderByInterviewRequestedAtAsc(
            CompanyRequestStatus status
    );

    List<CompanyRequest> findByCollegeCompanyIdAndStatusOrderByInterviewRequestedAtAsc(
            UUID collegeCompanyId,
            CompanyRequestStatus status
    );
}