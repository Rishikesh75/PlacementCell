package com.example.placementicsbackend.dto.collegeCompany;

import java.time.Instant;
import java.util.UUID;

public record CollegeCompanyResponse(
        UUID id,
        UUID collegeId,
        UUID companyId,
        String companyKey,
        Instant createdAt,
        Instant updatedAt
) {
}