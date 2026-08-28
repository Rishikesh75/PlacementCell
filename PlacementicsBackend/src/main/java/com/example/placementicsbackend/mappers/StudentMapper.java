package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.student.StudentRequest;
import com.example.placementicsbackend.dto.student.StudentResponse;
import com.example.placementicsbackend.models.Student;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StudentMapper {

    private final CollegeRepository collegeRepository;

    public Student toEntity(StudentRequest request) {
        return Student.builder()
                .college(collegeRepository.getReferenceById(request.collegeId()))
                .name(request.name().trim())
                .email(request.email().trim())
                .rollNo(request.rollNo().trim())
                .batch(request.batch().trim())
                .department(trimToNull(request.department()))
                .build();
    }

    public void updateEntity(Student student, StudentRequest request) {
        student.setCollege(
                collegeRepository.getReferenceById(request.collegeId())
        );
        student.setName(request.name().trim());
        student.setEmail(request.email().trim());
        student.setRollNo(request.rollNo().trim());
        student.setBatch(request.batch().trim());
        student.setDepartment(trimToNull(request.department()));
    }

    public StudentResponse toResponse(Student student) {
        return new StudentResponse(
                student.getId(),
                student.getCollege().getId(),
                student.getName(),
                student.getEmail(),
                student.getRollNo(),
                student.getBatch(),
                student.getDepartment(),
                student.getCreatedAt(),
                student.getUpdatedAt()
        );
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}