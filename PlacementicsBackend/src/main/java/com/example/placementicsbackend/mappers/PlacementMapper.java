package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.placement.PlacementRequest;
import com.example.placementicsbackend.dto.placement.PlacementResponse;
import com.example.placementicsbackend.models.Placement;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import com.example.placementicsbackend.repositories.jpa.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlacementMapper {

    private final StudentRepository studentRepository;
    private final CollegeCompanyRepository collegeCompanyRepository;

    public Placement toEntity(PlacementRequest request) {
        return Placement.builder()
                .student(
                        studentRepository.getReferenceById(request.studentId())
                )
                .collegeCompany(
                        collegeCompanyRepository.getReferenceById(
                                request.collegeCompanyId()
                        )
                )
                .packageAmount(request.packageAmount())
                .role(request.role())
                .placementDate(request.placementDate())
                .build();
    }

    public void updateEntity(
            Placement placement,
            PlacementRequest request
    ) {
        placement.setStudent(
                studentRepository.getReferenceById(request.studentId())
        );
        placement.setCollegeCompany(
                collegeCompanyRepository.getReferenceById(
                        request.collegeCompanyId()
                )
        );
        placement.setPackageAmount(request.packageAmount());
        placement.setRole(request.role());
        placement.setPlacementDate(request.placementDate());
    }

    public PlacementResponse toResponse(Placement placement) {
        return new PlacementResponse(
                placement.getId(),
                placement.getStudent().getId(),
                placement.getCollegeCompany().getId(),
                placement.getPackageAmount(),
                placement.getRole(),
                placement.getPlacementDate(),
                placement.getCreatedAt(),
                placement.getUpdatedAt()
        );
    }
}