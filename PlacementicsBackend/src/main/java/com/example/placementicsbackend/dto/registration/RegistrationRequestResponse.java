package com.example.placementicsbackend.dto.registration;

import com.example.placementicsbackend.models.enums.RegistrationRole;
import com.example.placementicsbackend.models.enums.RegistrationStatus;

import java.time.Instant;
import java.util.UUID;

public record RegistrationRequestResponse(
        UUID id,
        UUID collegeId,
        RegistrationRole role,
        String name,
        String email,
        String rollNo,
        String batch,
        String department,
        Integer passingYear,
        String companyName,
        String companyKey,
        String designation,
        RegistrationStatus status,
        Instant submittedAt,
        Instant reviewedAt
) {
}
