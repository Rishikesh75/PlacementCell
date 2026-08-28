package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.collegeCompany.CollegeCompanyRequest;
import com.example.placementicsbackend.dto.collegeCompany.CollegeCompanyResponse;
import com.example.placementicsbackend.models.CollegeCompany;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import com.example.placementicsbackend.repositories.jpa.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CollegeCompanyMapper {

    private final CollegeRepository collegeRepository;
    private final CompanyRepository companyRepository;

    public CollegeCompany toEntity(CollegeCompanyRequest request) {
        return CollegeCompany.builder()
                .college(collegeRepository.getReferenceById(request.collegeId()))
                .company(companyRepository.getReferenceById(request.companyId()))
                .companyKey(request.companyKey().trim())
                .build();
    }

    public void updateEntity(
            CollegeCompany collegeCompany,
            CollegeCompanyRequest request
    ) {
        collegeCompany.setCollege(
                collegeRepository.getReferenceById(request.collegeId())
        );
        collegeCompany.setCompany(
                companyRepository.getReferenceById(request.companyId())
        );
        collegeCompany.setCompanyKey(request.companyKey().trim());
    }

    public CollegeCompanyResponse toResponse(
            CollegeCompany collegeCompany
    ) {
        return new CollegeCompanyResponse(
                collegeCompany.getId(),
                collegeCompany.getCollege().getId(),
                collegeCompany.getCompany().getId(),
                collegeCompany.getCompanyKey(),
                collegeCompany.getCreatedAt(),
                collegeCompany.getUpdatedAt()
        );
    }
}