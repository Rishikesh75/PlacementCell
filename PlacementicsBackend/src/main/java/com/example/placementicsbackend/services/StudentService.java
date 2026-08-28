package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.student.*;
import com.example.placementicsbackend.exceptions.*;
import com.example.placementicsbackend.mappers.StudentMapper;
import com.example.placementicsbackend.models.Student;
import com.example.placementicsbackend.repositories.jpa.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StudentService {

    private final StudentRepository repository;
    private final StudentMapper mapper;

    public List<StudentResponse> findAll(String name) {
        List<Student> students = name == null || name.isBlank()
                ? repository.findAllByOrderByNameAsc()
                : repository.findByNameContainingIgnoreCaseOrderByNameAsc(name.trim());

        return students.stream().map(mapper::toResponse).toList();
    }

    public StudentResponse findById(UUID id) {
        return mapper.toResponse(getStudent(id));
    }

    public List<StudentResponse> findByCollege(UUID collegeId) {
        return repository.findByCollegeIdOrderByNameAsc(collegeId)
                .stream().map(mapper::toResponse).toList();
    }

    @Transactional
    public StudentResponse create(StudentRequest request) {
        if (repository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new DuplicateResourceException("Student email already exists");
        }

        if (repository.existsByCollegeIdAndRollNoIgnoreCase(
                request.collegeId(), request.rollNo().trim())) {
            throw new DuplicateResourceException("Student roll number already exists");
        }

        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public StudentResponse update(UUID id, StudentRequest request) {
        Student student = getStudent(id);

        if (repository.existsByEmailIgnoreCaseAndIdNot(
                request.email().trim(), id)) {
            throw new DuplicateResourceException("Student email already exists");
        }

        if (repository.existsByCollegeIdAndRollNoIgnoreCaseAndIdNot(
                request.collegeId(), request.rollNo().trim(), id)) {
            throw new DuplicateResourceException("Student roll number already exists");
        }

        mapper.updateEntity(student, request);
        return mapper.toResponse(repository.save(student));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getStudent(id));
    }

    private Student getStudent(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found: " + id
                ));
    }
}