package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.tpo.*;
import com.example.placementicsbackend.exceptions.*;
import com.example.placementicsbackend.mappers.TPOMapper;
import com.example.placementicsbackend.models.TPO;
import com.example.placementicsbackend.repositories.jpa.TPORepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TPOService {

    private final TPORepository repository;
    private final TPOMapper mapper;

    public List<TPOResponse> findAll(String name) {
        List<TPO> tpos = name == null || name.isBlank()
                ? repository.findAllByOrderByNameAsc()
                : repository.findByNameContainingIgnoreCaseOrderByNameAsc(name.trim());

        return tpos.stream().map(mapper::toResponse).toList();
    }

    public TPOResponse findById(UUID id) {
        return mapper.toResponse(getTPO(id));
    }

    public UUID findIdByEmail(String email, UUID collegeId) {
        return repository.findByCollegeIdAndEmailIgnoreCase(collegeId, email.trim())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "TPO not found for email: " + email
                ))
                .getId();
    }

    public List<TPOResponse> findByCollege(UUID collegeId) {
        return repository.findByCollegeIdOrderByNameAsc(collegeId)
                .stream().map(mapper::toResponse).toList();
    }

    @Transactional
    public TPOResponse create(TPORequest request) {
        if (repository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new DuplicateResourceException("TPO email already exists");
        }

        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public TPOResponse update(UUID id, TPORequest request) {
        TPO tpo = getTPO(id);

        if (repository.existsByEmailIgnoreCaseAndIdNot(
                request.email().trim(), id)) {
            throw new DuplicateResourceException("TPO email already exists");
        }

        mapper.updateEntity(tpo, request);
        return mapper.toResponse(repository.save(tpo));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getTPO(id));
    }

    private TPO getTPO(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "TPO not found: " + id
                ));
    }
}