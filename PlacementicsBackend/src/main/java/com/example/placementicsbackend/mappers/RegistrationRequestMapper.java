package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.registration.RegistrationRequestResponse;
import com.example.placementicsbackend.models.RegistrationRequest;
import org.springframework.stereotype.Component;

@Component
public class RegistrationRequestMapper {

    public RegistrationRequestResponse toResponse(RegistrationRequest request) {
        return new RegistrationRequestResponse(
                request.getId(),
                request.getCollege().getId(),
                request.getRole(),
                request.getName(),
                request.getEmail(),
                request.getRollNo(),
                request.getBatch(),
                request.getDepartment(),
                request.getPassingYear(),
                request.getCompanyName(),
                request.getCompanyKey(),
                request.getDesignation(),
                request.getStatus(),
                request.getSubmittedAt(),
                request.getReviewedAt()
        );
    }
}
