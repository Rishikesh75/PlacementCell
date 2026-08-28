package com.example.placementicsbackend.dto.tpo;

import java.time.Instant;
import java.util.UUID;

public record TPOResponse(
        UUID id,
        UUID collegeId,
        String name,
        String email,
        Instant createdAt,
        Instant updatedAt
) {
}