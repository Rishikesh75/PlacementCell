package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.tpo.TPORequest;
import com.example.placementicsbackend.dto.tpo.TPOResponse;
import com.example.placementicsbackend.models.TPO;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TPOMapper {

    private final CollegeRepository collegeRepository;

    public TPO toEntity(TPORequest request) {
        return TPO.builder()
                .college(collegeRepository.getReferenceById(request.collegeId()))
                .name(request.name().trim())
                .email(request.email().trim())
                .build();
    }

    public void updateEntity(TPO tpo, TPORequest request) {
        tpo.setCollege(
                collegeRepository.getReferenceById(request.collegeId())
        );
        tpo.setName(request.name().trim());
        tpo.setEmail(request.email().trim());
    }

    public TPOResponse toResponse(TPO tpo) {
        return new TPOResponse(
                tpo.getId(),
                tpo.getCollege().getId(),
                tpo.getName(),
                tpo.getEmail(),
                tpo.getCreatedAt(),
                tpo.getUpdatedAt()
        );
    }
}