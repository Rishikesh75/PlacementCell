package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.alumni.AlumniRequest;
import com.example.placementicsbackend.dto.alumni.AlumniResponse;
import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import com.example.placementicsbackend.repositories.jpa.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlumniMapper {

    private final CollegeRepository collegeRepository;
    private final CompanyRepository companyRepository;

    public Alumni toEntity(AlumniRequest request) {
        return Alumni.builder()
                .college(
                        collegeRepository.getReferenceById(
                                request.collegeId()
                        )
                )
                .company(request.companyId() == null
                        ? null
                        : companyRepository.getReferenceById(
                                request.companyId()
                        ))
                .name(request.name().trim())
                .email(trimToNull(request.email()))
                .designation(trimToNull(request.designation()))
                .passingYear(request.passingYear())
                .build();
    }

    public void updateEntity(
            Alumni alumni,
            AlumniRequest request
    ) {
        alumni.setCollege(
                collegeRepository.getReferenceById(
                        request.collegeId()
                )
        );

        alumni.setCompany(request.companyId() == null
                ? null
                : companyRepository.getReferenceById(
                        request.companyId()
                ));

        alumni.setName(request.name().trim());
        alumni.setEmail(trimToNull(request.email()));
        alumni.setDesignation(trimToNull(request.designation()));
        alumni.setPassingYear(request.passingYear());
    }

    public AlumniResponse toResponse(Alumni alumni) {
        return new AlumniResponse(
                alumni.getId(),
                alumni.getCollege().getId(),
                alumni.getCompany() == null
                        ? null
                        : alumni.getCompany().getId(),
                alumni.getName(),
                alumni.getEmail(),
                alumni.getDesignation(),
                alumni.getPassingYear(),
                alumni.getCreatedAt(),
                alumni.getUpdatedAt()
        );
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}