package com.example.placementicsbackend.dto.teacher;

import java.time.Instant;
import java.util.UUID;

public record TeacherResponse(
        UUID id,
        UUID collegeId,
        String name,
        String email,
        String department,
        Integer joiningYear,
        Instant createdAt,
        Instant updatedAt
) {
}