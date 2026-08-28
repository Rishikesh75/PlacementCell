package com.example.placementicsbackend.dto.student;

import java.time.Instant;
import java.util.UUID;

public record StudentResponse(
        UUID id,
        UUID collegeId,
        String name,
        String email,
        String rollNo,
        String batch,
        String department,
        Instant createdAt,
        Instant updatedAt
) {
}