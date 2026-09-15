package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.alumni.AlumniRequest;
import com.example.placementicsbackend.dto.alumni.AlumniResponse;
import com.example.placementicsbackend.exceptions.DuplicateResourceException;
import com.example.placementicsbackend.exceptions.ResourceNotFoundException;
import com.example.placementicsbackend.mappers.AlumniMapper;
import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.models.UserAccount;
import com.example.placementicsbackend.repositories.jpa.AlumniRepository;
import com.example.placementicsbackend.repositories.jpa.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlumniService {

    private final AlumniRepository alumniRepository;
    private final AlumniMapper alumniMapper;
    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public List<AlumniResponse> findAll(String name) {
        List<Alumni> alumni = name == null || name.isBlank()
                ? alumniRepository.findAllByOrderByNameAsc()
                : alumniRepository
                        .findByNameContainingIgnoreCaseOrderByNameAsc(
                                name.trim()
                        );

        return alumni.stream()
                .map(alumniMapper::toResponse)
                .toList();
    }

    public AlumniResponse findById(UUID id) {
        return alumniMapper.toResponse(getAlumni(id));
    }

    public UUID findIdByEmail(String email, UUID collegeId, String password) {
        Alumni alumni = alumniRepository
                .findByCollegeIdAndEmailIgnoreCase(collegeId, email.trim())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Alumni not found for email: " + email
                ));

        UserAccount account = userAccountRepository.findByAlumniId(alumni.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Alumni account not found for email: " + email
                ));

        if (!passwordEncoder.matches(password, account.getPasswordHash())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        return alumni.getId();
    }

    public List<AlumniResponse> findByCollege(UUID collegeId) {
        return alumniRepository.findByCollegeIdOrderByNameAsc(collegeId)
                .stream()
                .map(alumniMapper::toResponse)
                .toList();
    }

    public List<AlumniResponse> findByCompany(UUID companyId) {
        return alumniRepository.findByCompanyIdOrderByNameAsc(companyId)
                .stream()
                .map(alumniMapper::toResponse)
                .toList();
    }

    public List<AlumniResponse> findByPassingYear(Integer passingYear) {
        return alumniRepository
                .findByPassingYearOrderByNameAsc(passingYear)
                .stream()
                .map(alumniMapper::toResponse)
                .toList();
    }

    @Transactional
    public AlumniResponse create(AlumniRequest request) {
        if (request.email() != null
                && alumniRepository.existsByEmailIgnoreCase(
                        request.email().trim()
                )) {
            throw new DuplicateResourceException(
                    "Alumni already exists with email: " + request.email()
            );
        }

        Alumni saved = alumniRepository.save(
                alumniMapper.toEntity(request)
        );

        return alumniMapper.toResponse(saved);
    }

    @Transactional
    public AlumniResponse update(UUID id, AlumniRequest request) {
        Alumni alumni = getAlumni(id);

        if (request.email() != null
                && alumniRepository.existsByEmailIgnoreCaseAndIdNot(
                        request.email().trim(),
                        id
                )) {
            throw new DuplicateResourceException(
                    "Alumni already exists with email: " + request.email()
            );
        }

        alumniMapper.updateEntity(alumni, request);

        return alumniMapper.toResponse(
                alumniRepository.save(alumni)
        );
    }

    @Transactional
    public void delete(UUID id) {
        alumniRepository.delete(getAlumni(id));
    }

    private Alumni getAlumni(UUID id) {
        return alumniRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Alumni not found: " + id
                        )
                );
    }
}