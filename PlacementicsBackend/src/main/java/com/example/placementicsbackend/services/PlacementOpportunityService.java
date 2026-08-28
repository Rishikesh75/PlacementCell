package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.placementOpportunity.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.PlacementOpportunityMapper;
import com.example.placementicsbackend.models.PlacementOpportunity;
import com.example.placementicsbackend.models.enums.OpportunityStatus;
import com.example.placementicsbackend.repositories.jpa.PlacementOpportunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementOpportunityService {

    private final PlacementOpportunityRepository repository;
    private final PlacementOpportunityMapper mapper;

    public List<PlacementOpportunityResponse> findAll() {
        return repository.findAllByOrderByDeadlineAsc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public PlacementOpportunityResponse findById(UUID id) {
        return mapper.toResponse(getOpportunity(id));
    }

    public List<PlacementOpportunityResponse> findByStatus(
            OpportunityStatus status
    ) {
        return repository.findByStatusOrderByDeadlineAsc(status)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public PlacementOpportunityResponse create(
            PlacementOpportunityRequest request
    ) {
        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public PlacementOpportunityResponse update(
            UUID id,
            PlacementOpportunityRequest request
    ) {
        PlacementOpportunity opportunity = getOpportunity(id);
        mapper.updateEntity(opportunity, request);
        return mapper.toResponse(repository.save(opportunity));
    }

    @Transactional
    public PlacementOpportunityResponse updateStatus(
            UUID id,
            OpportunityStatus status
    ) {
        PlacementOpportunity opportunity = getOpportunity(id);
        opportunity.setStatus(status);
        return mapper.toResponse(repository.save(opportunity));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getOpportunity(id));
    }

    private PlacementOpportunity getOpportunity(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Placement opportunity not found: " + id
                ));
    }
}