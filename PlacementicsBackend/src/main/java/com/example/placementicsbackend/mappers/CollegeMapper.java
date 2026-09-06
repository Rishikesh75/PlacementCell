package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.config.R2PublicUrlBuilder;
import com.example.placementicsbackend.dto.college.CollegeRequest;
import com.example.placementicsbackend.dto.college.CollegeResponse;
import com.example.placementicsbackend.models.College;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CollegeMapper {

    private final R2PublicUrlBuilder r2PublicUrlBuilder;

    public College toEntity(CollegeRequest request) {
        return College.builder()
                .name(trim(request.name()))
                .address(trimToNull(request.address()))
                .contact(trimToNull(request.contact()))
                .imageFileName(trimToNull(request.imageFileName()))
                .verifiedStatus(Boolean.TRUE.equals(request.verifiedStatus()))
                .build();
    }

    public void updateEntity(College college, CollegeRequest request) {
        college.setName(trim(request.name()));
        college.setAddress(trimToNull(request.address()));
        college.setContact(trimToNull(request.contact()));
        college.setImageFileName(trimToNull(request.imageFileName()));
        if (request.verifiedStatus() != null) {
            college.setVerifiedStatus(request.verifiedStatus());
        }
    }

    public CollegeResponse toResponse(College college) {
        String imageFileName = college.getImageFileName();
        return new CollegeResponse(
                college.getId(),
                college.getName(),
                college.getAddress(),
                college.getContact(),
                imageFileName,
                r2PublicUrlBuilder.toPublicUrl(imageFileName),
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
