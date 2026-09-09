package com.example.placementicsbackend.services;

import com.example.placementicsbackend.dto.company.*;
import com.example.placementicsbackend.exceptions.*;
import com.example.placementicsbackend.mappers.CompanyMapper;
import com.example.placementicsbackend.models.CollegeCompany;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.UserAccount;
import com.example.placementicsbackend.models.enums.UserRole;
import com.example.placementicsbackend.repositories.jpa.CompanyRepository;
import com.example.placementicsbackend.repositories.jpa.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompanyService {

    private final CompanyRepository repository;
    private final CompanyMapper mapper;
    private final UserAccountRepository userAccountRepository;

    public List<CompanyResponse> findAll(String name) {
        List<Company> companies = name == null || name.isBlank()
                ? repository.findAllByOrderByNameAsc()
                : repository.findByNameContainingIgnoreCaseOrderByNameAsc(name.trim());

        return companies.stream().map(mapper::toResponse).toList();
    }

    public CompanyResponse findById(UUID id) {
        return mapper.toResponse(getCompany(id));
    }

    public UUID findIdByEmail(String email, UUID collegeId) {
        UserAccount account = userAccountRepository
                .findByEmailIgnoreCaseAndRoleAndCollegeCompanyCollegeId(
                        email.trim(),
                        UserRole.COMPANY,
                        collegeId
                )
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found for email: " + email
                ));

        CollegeCompany collegeCompany = account.getCollegeCompany();
        if (collegeCompany == null) {
            throw new ResourceNotFoundException(
                    "Company not found for email: " + email
            );
        }

        return collegeCompany.getId();
    }

    @Transactional
    public CompanyResponse create(CompanyRequest request) {
        if (repository.existsByNameIgnoreCase(request.name().trim())) {
            throw new DuplicateResourceException("Company already exists");
        }

        return mapper.toResponse(repository.save(mapper.toEntity(request)));
    }

    @Transactional
    public CompanyResponse update(UUID id, CompanyRequest request) {
        Company company = getCompany(id);

        if (repository.existsByNameIgnoreCaseAndIdNot(request.name().trim(), id)) {
            throw new DuplicateResourceException("Company already exists");
        }

        mapper.updateEntity(company, request);
        return mapper.toResponse(repository.save(company));
    }

    @Transactional
    public void delete(UUID id) {
        repository.delete(getCompany(id));
    }

    private Company getCompany(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found: " + id
                ));
    }
}