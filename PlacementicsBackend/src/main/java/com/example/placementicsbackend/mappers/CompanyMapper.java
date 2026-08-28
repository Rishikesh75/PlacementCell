package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.company.CompanyRequest;
import com.example.placementicsbackend.dto.company.CompanyResponse;
import com.example.placementicsbackend.models.Company;
import org.springframework.stereotype.Component;

@Component
public class CompanyMapper {

    public Company toEntity(CompanyRequest request) {
        return Company.builder()
                .name(request.name().trim())
                .industry(trimToNull(request.industry()))
                .build();
    }

    public void updateEntity(Company company, CompanyRequest request) {
        company.setName(request.name().trim());
        company.setIndustry(trimToNull(request.industry()));
    }

    public CompanyResponse toResponse(Company company) {
        return new CompanyResponse(
                company.getId(),
                company.getName(),
                company.getIndustry(),
                company.getCreatedAt(),
                company.getUpdatedAt()
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