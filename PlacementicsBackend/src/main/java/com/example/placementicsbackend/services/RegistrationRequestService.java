package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.registration.RegistrationRequestCreate;
import com.example.placementicsbackend.dto.registration.RegistrationRequestResponse;
import com.example.placementicsbackend.exceptions.DuplicateResourceException;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.RegistrationRequestMapper;
import com.example.placementicsbackend.models.*;
import com.example.placementicsbackend.models.enums.RegistrationRole;
import com.example.placementicsbackend.models.enums.RegistrationStatus;
import com.example.placementicsbackend.models.enums.UserRole;
import com.example.placementicsbackend.repositories.jpa.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegistrationRequestService {

    private final RegistrationRequestRepository repository;
    private final RegistrationRequestMapper mapper;
    private final CollegeRepository collegeRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final AlumniRepository alumniRepository;
    private final CompanyRepository companyRepository;
    private final CollegeCompanyRepository collegeCompanyRepository;
    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public List<RegistrationRequestResponse> findAll(UUID collegeId, RegistrationStatus status) {
        List<RegistrationRequest> requests = status == null
                ? repository.findByCollegeIdOrderBySubmittedAtDesc(collegeId)
                : repository.findByCollegeIdAndStatusOrderBySubmittedAtDesc(collegeId, status);

        return requests.stream().map(mapper::toResponse).toList();
    }

    public RegistrationRequestResponse findById(UUID id) {
        return mapper.toResponse(getRequest(id));
    }

    @Transactional
    public RegistrationRequestResponse submit(RegistrationRequestCreate request) {
        String email = request.email().trim();

        if (userAccountRepository.existsByEmailIgnoreCase(email)) {
            throw new DuplicateResourceException("An account already exists for this email");
        }

        if (repository.existsByCollegeIdAndEmailIgnoreCaseAndRoleAndStatus(
                request.collegeId(), email, request.role(), RegistrationStatus.PENDING)) {
            throw new DuplicateResourceException("A pending registration already exists for this email");
        }

        RegistrationRequest entity = RegistrationRequest.builder()
                .college(collegeRepository.getReferenceById(request.collegeId()))
                .role(request.role())
                .name(request.name().trim())
                .email(email)
                .passwordHash(passwordEncoder.encode(request.password()))
                .rollNo(trimToNull(request.rollNo()))
                .batch(trimToNull(request.batch()))
                .department(trimToNull(request.department()))
                .passingYear(request.passingYear())
                .companyName(trimToNull(request.companyName()))
                .companyKey(trimToNull(request.companyKey()))
                .designation(trimToNull(request.designation()))
                .build();

        return mapper.toResponse(repository.save(entity));
    }

    @Transactional
    public RegistrationRequestResponse approve(UUID id) {
        RegistrationRequest request = getRequest(id);

        if (request.getStatus() != RegistrationStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Registration request was already reviewed"
            );
        }

        if (userAccountRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new DuplicateResourceException("An account already exists for this email");
        }

        switch (request.getRole()) {
            case STUDENT -> approveStudent(request);
            case TEACHER -> approveTeacher(request);
            case ALUMNI -> approveAlumni(request);
            case COMPANY -> approveCompany(request);
        }

        request.setStatus(RegistrationStatus.APPROVED);
        request.setReviewedAt(Instant.now());
        return mapper.toResponse(repository.save(request));
    }

    @Transactional
    public RegistrationRequestResponse reject(UUID id) {
        RegistrationRequest request = getRequest(id);

        if (request.getStatus() != RegistrationStatus.PENDING) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Registration request was already reviewed"
            );
        }

        request.setStatus(RegistrationStatus.REJECTED);
        request.setReviewedAt(Instant.now());
        return mapper.toResponse(repository.save(request));
    }

    private void approveStudent(RegistrationRequest request) {
        require(request.getRollNo(), "rollNo", request);
        require(request.getBatch(), "batch", request);

        Student student = studentRepository.save(Student.builder()
                .college(request.getCollege())
                .name(request.getName())
                .email(request.getEmail())
                .rollNo(request.getRollNo())
                .batch(request.getBatch())
                .department(request.getDepartment())
                .build());

        saveAccount(request, UserRole.STUDENT, student, null, null, null, null);
    }

    private void approveTeacher(RegistrationRequest request) {
        Teacher teacher = teacherRepository.save(Teacher.builder()
                .college(request.getCollege())
                .name(request.getName())
                .email(request.getEmail())
                .department(request.getDepartment())
                .build());

        saveAccount(request, UserRole.TEACHER, null, teacher, null, null, null);
    }

    private void approveAlumni(RegistrationRequest request) {
        Integer passingYear = request.getPassingYear();
        if (passingYear == null && request.getBatch() != null) {
            try {
                passingYear = Integer.valueOf(request.getBatch());
            } catch (NumberFormatException ignored) {
                // The validation below returns a useful API error.
            }
        }
        if (passingYear == null) {
            throw invalid(request, "passingYear is required for alumni registration");
        }

        Alumni alumni = alumniRepository.save(Alumni.builder()
                .college(request.getCollege())
                .name(request.getName())
                .email(request.getEmail())
                .designation(request.getDesignation())
                .passingYear(passingYear)
                .build());

        saveAccount(request, UserRole.ALUMNI, null, null, alumni, null, null);
    }

    private void approveCompany(RegistrationRequest request) {
        require(request.getCompanyName(), "companyName", request);

        Company company = companyRepository.findByNameIgnoreCase(request.getCompanyName())
                .orElseGet(() -> companyRepository.save(Company.builder()
                        .name(request.getCompanyName())
                        .build()));

        if (collegeCompanyRepository.existsByCollegeIdAndCompanyId(
                request.getCollege().getId(), company.getId())) {
            throw new DuplicateResourceException("Company is already registered with this college");
        }

        String companyKey = request.getCompanyKey() == null
                ? "company-" + UUID.randomUUID().toString().substring(0, 8)
                : request.getCompanyKey();

        if (collegeCompanyRepository.existsByCollegeIdAndCompanyKey(
                request.getCollege().getId(), companyKey)) {
            throw new DuplicateResourceException("Company key is already used by this college");
        }

        CollegeCompany collegeCompany = collegeCompanyRepository.save(CollegeCompany.builder()
                .college(request.getCollege())
                .company(company)
                .companyKey(companyKey)
                .build());

        saveAccount(request, UserRole.COMPANY, null, null, null, null, collegeCompany);
    }

    private void saveAccount(
            RegistrationRequest request,
            UserRole role,
            Student student,
            Teacher teacher,
            Alumni alumni,
            TPO tpo,
            CollegeCompany collegeCompany
    ) {
        userAccountRepository.save(UserAccount.builder()
                .email(request.getEmail())
                .passwordHash(request.getPasswordHash())
                .role(role)
                .student(student)
                .teacher(teacher)
                .alumni(alumni)
                .tpo(tpo)
                .collegeCompany(collegeCompany)
                .enabled(true)
                .build());
    }

    private RegistrationRequest getRequest(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Registration request not found: " + id
                ));
    }

    private void require(String value, String field, RegistrationRequest request) {
        if (value == null || value.isBlank()) {
            throw invalid(request, field + " is required for " + request.getRole().name().toLowerCase() + " registration");
        }
    }

    private ResponseStatusException invalid(RegistrationRequest request, String message) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
