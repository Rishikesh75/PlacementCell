package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.college.CollegeRequest;
import com.example.placementicsbackend.dto.college.CollegeResponse;
import com.example.placementicsbackend.models.College;
import org.springframework.stereotype.Component;

@Component
public class CollegeMapper {

    public College toEntity(CollegeRequest request) {
        return College.builder()
                .name(trim(request.name()))
                .address(trimToNull(request.address()))
                .contact(trimToNull(request.contact()))
                .verifiedStatus(Boolean.TRUE.equals(request.verifiedStatus()))
                .build();
    }

    public void updateEntity(College college, CollegeRequest request) {
        college.setName(trim(request.name()));
        college.setAddress(trimToNull(request.address()));
        college.setContact(trimToNull(request.contact()));
        if (request.verifiedStatus() != null) {
            college.setVerifiedStatus(request.verifiedStatus());
        }
    }

    public CollegeResponse toResponse(College college) {
        return new CollegeResponse(
                college.getId(),
                college.getName(),
                college.getAddress(),
                college.getContact(),
                college.isVerifiedStatus(),
                college.getCreatedAt(),
                college.getUpdatedAt()
        );
    }

    private String trim(String value) {
        return value == null ? null : value.trim();
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
