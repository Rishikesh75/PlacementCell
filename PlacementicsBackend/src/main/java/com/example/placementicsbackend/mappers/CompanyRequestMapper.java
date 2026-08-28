package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.companyRequest.CompanyRequest_Request;
import com.example.placementicsbackend.dto.companyRequest.CompanyRequest_Response;
import com.example.placementicsbackend.models.CompanyRequest;
import com.example.placementicsbackend.models.enums.CompanyRequestStatus;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyRequestMapper {

    private final CollegeCompanyRepository collegeCompanyRepository;

    public CompanyRequest toEntity(CompanyRequest_Request request) {
        return CompanyRequest.builder()
                .collegeCompany(
                        collegeCompanyRepository.getReferenceById(
                                request.collegeCompanyId()
                        )
                )
                .interviewRequestedAt(request.interviewRequestedAt())
                .numberOfPositions(request.numberOfPositions())
                .numberOfRounds(request.numberOfRounds())
                .timings(request.timings())
                .breakfast(Boolean.TRUE.equals(request.breakfast()))
                .lunch(Boolean.TRUE.equals(request.lunch()))
                .dinner(Boolean.TRUE.equals(request.dinner()))
                .numberOfPeopleAttending(request.numberOfPeopleAttending())
                .contactName(request.contactName())
                .contactEmail(request.contactEmail())
                .contactPhone(request.contactPhone())
                .announcementForStudents(request.announcementForStudents())
                .status(CompanyRequestStatus.PENDING)
                .build();
    }

    public void updateEntity(
            CompanyRequest companyRequest,
            CompanyRequest_Request request
    ) {
        companyRequest.setCollegeCompany(
                collegeCompanyRepository.getReferenceById(
                        request.collegeCompanyId()
                )
        );
        companyRequest.setInterviewRequestedAt(
                request.interviewRequestedAt()
        );
        companyRequest.setNumberOfPositions(request.numberOfPositions());
        companyRequest.setNumberOfRounds(request.numberOfRounds());
        companyRequest.setTimings(request.timings());
        companyRequest.setBreakfast(Boolean.TRUE.equals(request.breakfast()));
        companyRequest.setLunch(Boolean.TRUE.equals(request.lunch()));
        companyRequest.setDinner(Boolean.TRUE.equals(request.dinner()));
        companyRequest.setNumberOfPeopleAttending(
                request.numberOfPeopleAttending()
        );
        companyRequest.setContactName(request.contactName());
        companyRequest.setContactEmail(request.contactEmail());
        companyRequest.setContactPhone(request.contactPhone());
        companyRequest.setAnnouncementForStudents(
                request.announcementForStudents()
        );
    }

    public CompanyRequest_Response toResponse(
            CompanyRequest companyRequest
    ) {
        return new CompanyRequest_Response(
                companyRequest.getId(),
                companyRequest.getCollegeCompany().getId(),
                companyRequest.getInterviewRequestedAt(),
                companyRequest.getNumberOfPositions(),
                companyRequest.getNumberOfRounds(),
                companyRequest.getTimings(),
                companyRequest.isBreakfast(),
                companyRequest.isLunch(),
                companyRequest.isDinner(),
                companyRequest.getStatus(),
                companyRequest.getNumberOfPeopleAttending(),
                companyRequest.getContactName(),
                companyRequest.getContactEmail(),
                companyRequest.getContactPhone(),
                companyRequest.getAnnouncementForStudents(),
                companyRequest.getCreatedAt(),
                companyRequest.getUpdatedAt()
        );
    }
}