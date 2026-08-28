package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.placementOpportunity.PlacementOpportunityRequest;
import com.example.placementicsbackend.dto.placementOpportunity.PlacementOpportunityResponse;
import com.example.placementicsbackend.models.PlacementOpportunity;
import com.example.placementicsbackend.models.enums.OpportunityStatus;
import com.example.placementicsbackend.repositories.jpa.AlumniRepository;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import com.example.placementicsbackend.repositories.jpa.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlacementOpportunityMapper {

    private final AlumniRepository alumniRepository;
    private final TeacherRepository teacherRepository;
    private final CollegeCompanyRepository collegeCompanyRepository;

    public PlacementOpportunity toEntity(
            PlacementOpportunityRequest request
    ) {
        return PlacementOpportunity.builder()
                .alumni(request.alumniId() == null
                        ? null
                        : alumniRepository.getReferenceById(
                                request.alumniId()
                        ))
                .teacher(request.teacherId() == null
                        ? null
                        : teacherRepository.getReferenceById(
                                request.teacherId()
                        ))
                .collegeCompany(
                        collegeCompanyRepository.getReferenceById(
                                request.collegeCompanyId()
                        )
                )
                .role(request.role())
                .eligibility(request.eligibility())
                .deadline(request.deadline())
                .status(OpportunityStatus.OPEN)
                .build();
    }

    public void updateEntity(
            PlacementOpportunity opportunity,
            PlacementOpportunityRequest request
    ) {
        opportunity.setAlumni(request.alumniId() == null
                ? null
                : alumniRepository.getReferenceById(request.alumniId()));

        opportunity.setTeacher(request.teacherId() == null
                ? null
                : teacherRepository.getReferenceById(request.teacherId()));

        opportunity.setCollegeCompany(
                collegeCompanyRepository.getReferenceById(
                        request.collegeCompanyId()
                )
        );
        opportunity.setRole(request.role());
        opportunity.setEligibility(request.eligibility());
        opportunity.setDeadline(request.deadline());
    }

    public PlacementOpportunityResponse toResponse(
            PlacementOpportunity opportunity
    ) {
        return new PlacementOpportunityResponse(
                opportunity.getId(),
                opportunity.getAlumni() == null
                        ? null
                        : opportunity.getAlumni().getId(),
                opportunity.getTeacher() == null
                        ? null
                        : opportunity.getTeacher().getId(),
                opportunity.getCollegeCompany().getId(),
                opportunity.getRole(),
                opportunity.getStatus(),
                opportunity.getEligibility(),
                opportunity.getDeadline(),
                opportunity.getCreatedAt(),
                opportunity.getUpdatedAt()
        );
    }
}