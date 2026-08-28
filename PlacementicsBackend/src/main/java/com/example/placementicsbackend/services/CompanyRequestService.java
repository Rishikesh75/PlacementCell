package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.companyRequest.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.CompanyRequestMapper;
import com.example.placementicsbackend.models.CompanyRequest;
import com.example.placementicsbackend.models.enums.CompanyRequestStatus;
import com.example.placementicsbackend.repositories.jpa.CompanyRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyRequestService {

    private final CompanyRequestRepository repository;
    private final CompanyRequestMapper mapper;

    public List<CompanyRequest_Response> findAll() {
        return repository.findAll().stream()
                .map(mapper::toResponse)
                .toList();
    }

    public CompanyRequest_Response findById(UUID id) {
        return mapper.toResponse(getRequest(id));
    }

    public List<CompanyRequest_Response> findByStatus(
            CompanyRequestStatus status
    ) {
        return repository.findByStatusOrderByInterviewRequestedAtAsc(status)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public CompanyRequest_Response create(CompanyRequest_Request request) {
        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public CompanyRequest_Response update(
            UUID id,
            CompanyRequest_Request request
    ) {
        CompanyRequest entity = getRequest(id);
        mapper.updateEntity(entity, request);
        return mapper.toResponse(repository.save(entity));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getRequest(id));
    }

    @Transactional
    public CompanyRequest_Response updateStatus(
            UUID id,
            CompanyRequestStatus status
    ) {
        CompanyRequest entity = getRequest(id);
        entity.setStatus(status);
        return mapper.toResponse(repository.save(entity));
    }

    private CompanyRequest getRequest(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company request not found: " + id
                ));
    }
}