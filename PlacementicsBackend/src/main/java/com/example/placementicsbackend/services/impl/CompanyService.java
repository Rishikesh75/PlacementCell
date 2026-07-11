package com.example.placementicsbackend.services.impl;

import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.services.Interfaces.ICompanyService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyService implements ICompanyService {

    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Company getCompanyById(String id) {
        return companyRepository.findById(id).orElse(null);
    }

    @Override
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public boolean updateCompany(String id, Company company) {
        if (!companyExists(id)) {
            return false;
        }
        company.setCompanyId(id);
        companyRepository.save(company);
        return true;
    }

    @Override
    public boolean deleteCompany(String id) {
        if (!companyRepository.existsById(id)) {
            return false;
        }
        companyRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean companyExists(String id) {
        return companyRepository.existsById(id);
    }
}
