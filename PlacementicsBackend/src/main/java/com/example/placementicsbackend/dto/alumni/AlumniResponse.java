package com.example.placementicsbackend.dto.alumni;

import java.time.Instant;
import java.util.UUID;

public record AlumniResponse(
        UUID id,
        UUID collegeId,
        UUID companyId,
        String name,
        String email,
        String designation,
        Integer passingYear,
        Instant createdAt,
        Instant updatedAt
) {
}