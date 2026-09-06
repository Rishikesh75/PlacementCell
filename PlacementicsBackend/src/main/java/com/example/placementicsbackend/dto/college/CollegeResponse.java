package com.example.placementicsbackend.dto.college;

import java.time.Instant;
import java.util.UUID;

public record CollegeResponse(
        UUID id,
        String name,
        String address,
        String contact,
        String imageFileName,
        String imageUrl,
        boolean verifiedStatus,
        Instant createdAt,
        Instant updatedAt
) {
}
