package com.example.placementicsbackend.dto.companyRequest;

import com.example.placementicsbackend.models.enums.CompanyRequestStatus;

import java.time.Instant;
import java.util.UUID;

public record CompanyRequest_Response(
        UUID id,
        UUID collegeCompanyId,
        Instant interviewRequestedAt,
        Integer numberOfPositions,
        Integer numberOfRounds,
        String timings,
        boolean breakfast,
        boolean lunch,
        boolean dinner,
        CompanyRequestStatus status,
        Integer numberOfPeopleAttending,
        String contactName,
        String contactEmail,
        String contactPhone,
        String announcementForStudents,
        Instant createdAt,
        Instant updatedAt
) {
}