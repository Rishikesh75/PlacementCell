package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.college.CollegeRequest;
import com.example.placementicsbackend.dto.college.CollegeResponse;
import com.example.placementicsbackend.exceptions.DuplicateResourceException;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.CollegeMapper;
import com.example.placementicsbackend.models.College;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CollegeService {

    private final CollegeRepository collegeRepository;
    private final CollegeMapper collegeMapper;

    public List<CollegeResponse> findAll(String name) {
        List<College> colleges = (name == null || name.isBlank())
                ? collegeRepository.findAllByOrderByNameAsc()
                : collegeRepository.findByNameContainingIgnoreCaseOrderByNameAsc(name.trim());

        return colleges.stream()
                .map(collegeMapper::toResponse)
                .toList();
    }

    public CollegeResponse findById(UUID id) {
        return collegeMapper.toResponse(getCollege(id));
    }

    @Transactional
    public CollegeResponse create(CollegeRequest request) {
        String name = request.name().trim();
        if (collegeRepository.existsByNameIgnoreCase(name)) {
            throw new DuplicateResourceException("College already exists with name: " + name);
        }
        College saved = collegeRepository.save(collegeMapper.toEntity(request));
        return collegeMapper.toResponse(saved);
    }

    @Transactional
    public CollegeResponse update(UUID id, CollegeRequest request) {
        College college = getCollege(id);
        String name = request.name().trim();
        if (collegeRepository.existsByNameIgnoreCaseAndIdNot(name, id)) {
            throw new DuplicateResourceException("College already exists with name: " + name);
        }
        collegeMapper.updateEntity(college, request);
        return collegeMapper.toResponse(collegeRepository.save(college));
    }

    @Transactional
    public void delete(UUID id) {
        College college = getCollege(id);
        collegeRepository.delete(college);
    }

    private College getCollege(UUID id) {
        return collegeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("College not found: " + id));
    }
}
