package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.RegistrationRequest;
import com.example.placementicsbackend.models.enums.RegistrationRole;
import com.example.placementicsbackend.models.enums.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RegistrationRequestRepository
        extends JpaRepository<RegistrationRequest, UUID> {

    List<RegistrationRequest> findByCollegeIdOrderBySubmittedAtDesc(UUID collegeId);

    List<RegistrationRequest> findByCollegeIdAndStatusOrderBySubmittedAtDesc(
            UUID collegeId,
            RegistrationStatus status
    );

    boolean existsByCollegeIdAndEmailIgnoreCaseAndRoleAndStatus(
            UUID collegeId,
            String email,
            RegistrationRole role,
            RegistrationStatus status
    );
}
