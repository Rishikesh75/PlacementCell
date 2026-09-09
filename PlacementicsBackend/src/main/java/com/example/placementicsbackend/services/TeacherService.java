package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.teacher.*;
import com.example.placementicsbackend.exceptions.*;
import com.example.placementicsbackend.mappers.TeacherMapper;
import com.example.placementicsbackend.models.Teacher;
import com.example.placementicsbackend.repositories.jpa.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeacherService {

    private final TeacherRepository repository;
    private final TeacherMapper mapper;

    public List<TeacherResponse> findAll(String name) {
        List<Teacher> teachers = name == null || name.isBlank()
                ? repository.findAllByOrderByNameAsc()
                : repository.findByNameContainingIgnoreCaseOrderByNameAsc(name.trim());

        return teachers.stream().map(mapper::toResponse).toList();
    }

    public TeacherResponse findById(UUID id) {
        return mapper.toResponse(getTeacher(id));
    }

    public UUID findIdByEmail(String email, UUID collegeId) {
        return repository.findByCollegeIdAndEmailIgnoreCase(collegeId, email.trim())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Teacher not found for email: " + email
                ))
                .getId();
    }

    public List<TeacherResponse> findByCollege(UUID collegeId) {
        return repository.findByCollegeIdOrderByNameAsc(collegeId)
                .stream().map(mapper::toResponse).toList();
    }

    @Transactional
    public TeacherResponse create(TeacherRequest request) {
        if (repository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new DuplicateResourceException("Teacher email already exists");
        }

        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public TeacherResponse update(UUID id, TeacherRequest request) {
        Teacher teacher = getTeacher(id);

        if (repository.existsByEmailIgnoreCaseAndIdNot(
                request.email().trim(), id)) {
            throw new DuplicateResourceException("Teacher email already exists");
        }

        mapper.updateEntity(teacher, request);
        return mapper.toResponse(repository.save(teacher));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getTeacher(id));
    }

    private Teacher getTeacher(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Teacher not found: " + id
                ));
    }
}