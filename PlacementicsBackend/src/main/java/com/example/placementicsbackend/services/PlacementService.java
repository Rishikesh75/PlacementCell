package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.placement.*;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.PlacementMapper;
import com.example.placementicsbackend.models.Placement;
import com.example.placementicsbackend.repositories.jpa.PlacementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PlacementService {

    private final PlacementRepository repository;
    private final PlacementMapper mapper;

    public List<PlacementResponse> findAll() {
        return repository.findAllByOrderByPlacementDateDesc()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    public PlacementResponse findById(UUID id) {
        return mapper.toResponse(getPlacement(id));
    }

    public List<PlacementResponse> findByStudent(UUID studentId) {
        return repository.findByStudentIdOrderByPlacementDateDesc(studentId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional
    public PlacementResponse create(PlacementRequest request) {
        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public PlacementResponse update(
            UUID id,
            PlacementRequest request
    ) {
        Placement placement = getPlacement(id);
        mapper.updateEntity(placement, request);
        return mapper.toResponse(repository.save(placement));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getPlacement(id));
    }

    private Placement getPlacement(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Placement not found: " + id
                ));
    }
}