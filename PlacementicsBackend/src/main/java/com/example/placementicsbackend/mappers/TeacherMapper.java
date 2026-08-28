package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.teacher.TeacherRequest;
import com.example.placementicsbackend.dto.teacher.TeacherResponse;
import com.example.placementicsbackend.models.Teacher;
import com.example.placementicsbackend.repositories.jpa.CollegeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TeacherMapper {

    private final CollegeRepository collegeRepository;

    public Teacher toEntity(TeacherRequest request) {
        return Teacher.builder()
                .college(collegeRepository.getReferenceById(request.collegeId()))
                .name(request.name().trim())
                .email(request.email().trim())
                .department(trimToNull(request.department()))
                .joiningYear(request.joiningYear())
                .build();
    }

    public void updateEntity(Teacher teacher, TeacherRequest request) {
        teacher.setCollege(
                collegeRepository.getReferenceById(request.collegeId())
        );
        teacher.setName(request.name().trim());
        teacher.setEmail(request.email().trim());
        teacher.setDepartment(trimToNull(request.department()));
        teacher.setJoiningYear(request.joiningYear());
    }

    public TeacherResponse toResponse(Teacher teacher) {
        return new TeacherResponse(
                teacher.getId(),
                teacher.getCollege().getId(),
                teacher.getName(),
                teacher.getEmail(),
                teacher.getDepartment(),
                teacher.getJoiningYear(),
                teacher.getCreatedAt(),
                teacher.getUpdatedAt()
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