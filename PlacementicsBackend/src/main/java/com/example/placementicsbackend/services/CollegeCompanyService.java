package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.collegeCompany.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.CollegeCompanyMapper;
import com.example.placementicsbackend.models.CollegeCompany;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CollegeCompanyService {

    private final CollegeCompanyRepository repository;
    private final CollegeCompanyMapper mapper;

    public List<CollegeCompanyResponse> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public CollegeCompanyResponse findById(UUID id) {
        return mapper.toResponse(getCollegeCompany(id));
    }

    public CollegeCompanyResponse findByCollegeAndCompany(
            UUID collegeId,
            UUID companyId
    ) {
        CollegeCompany entity = repository
                .findByCollegeIdAndCompanyId(collegeId, companyId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "College-company relationship not found"
                ));

        return mapper.toResponse(entity);
    }

    @Transactional
    public CollegeCompanyResponse create(CollegeCompanyRequest request) {
        CollegeCompany entity = repository.save(mapper.toEntity(request));
        return mapper.toResponse(entity);
    }

    @Transactional
    public CollegeCompanyResponse update(
            UUID id,
            CollegeCompanyRequest request
    ) {
        CollegeCompany entity = getCollegeCompany(id);
        mapper.updateEntity(entity, request);
        return mapper.toResponse(repository.save(entity));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getCollegeCompany(id));
    }

    private CollegeCompany getCollegeCompany(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "College-company relationship not found: " + id
                ));
    }
}