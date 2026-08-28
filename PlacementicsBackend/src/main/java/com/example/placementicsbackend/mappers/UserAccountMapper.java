package com.example.placementicsbackend.mappers;

import com.example.placementicsbackend.dto.userAccount.UserAccountRequest;
import com.example.placementicsbackend.dto.userAccount.UserAccountResponse;
import com.example.placementicsbackend.models.UserAccount;
import com.example.placementicsbackend.repositories.jpa.AlumniRepository;
import com.example.placementicsbackend.repositories.jpa.CollegeCompanyRepository;
import com.example.placementicsbackend.repositories.jpa.StudentRepository;
import com.example.placementicsbackend.repositories.jpa.TPORepository;
import com.example.placementicsbackend.repositories.jpa.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserAccountMapper {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AlumniRepository alumniRepository;
    private final TPORepository tpoRepository;
    private final CollegeCompanyRepository collegeCompanyRepository;

    public UserAccount toEntity(
            UserAccountRequest request,
            String encodedPassword
    ) {
        return UserAccount.builder()
                .email(request.email().trim())
                .passwordHash(encodedPassword)
                .role(request.role())
                .student(request.studentId() == null
                        ? null
                        : studentRepository.getReferenceById(
                                request.studentId()
                        ))
                .teacher(request.teacherId() == null
                        ? null
                        : teacherRepository.getReferenceById(
                                request.teacherId()
                        ))
                .alumni(request.alumniId() == null
                        ? null
                        : alumniRepository.getReferenceById(
                                request.alumniId()
                        ))
                .tpo(request.tpoId() == null
                        ? null
                        : tpoRepository.getReferenceById(
                                request.tpoId()
                        ))
                .collegeCompany(request.collegeCompanyId() == null
                        ? null
                        : collegeCompanyRepository.getReferenceById(
                                request.collegeCompanyId()
                        ))
                .enabled(request.enabled() == null || request.enabled())
                .build();
    }

    public UserAccountResponse toResponse(UserAccount account) {
        return new UserAccountResponse(
                account.getId(),
                account.getEmail(),
                account.getRole(),
                account.getStudent() == null
                        ? null
                        : account.getStudent().getId(),
                account.getTeacher() == null
                        ? null
                        : account.getTeacher().getId(),
                account.getAlumni() == null
                        ? null
                        : account.getAlumni().getId(),
                account.getTpo() == null
                        ? null
                        : account.getTpo().getId(),
                account.getCollegeCompany() == null
                        ? null
                        : account.getCollegeCompany().getId(),
                account.isEnabled(),
                account.getCreatedAt(),
                account.getUpdatedAt()
        );
    }
}