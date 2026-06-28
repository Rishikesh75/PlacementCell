package com.example.placementicsbackend.services.crud.impl;

import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeCreateDto;
import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.CompanyEmployee;
import com.example.placementicsbackend.repositories.CompanyEmployeeRepository;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.services.crud.interfaces.ICompanyEmployeeService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyEmployeeService implements ICompanyEmployeeService {

    private final CompanyEmployeeRepository companyEmployeeRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<CompanyEmployeeDto> getAllCompanyEmployees() {
        List<CompanyEmployee> employees = companyEmployeeRepository.findAll();
        List<String> companyIds = employees.stream()
                .map(CompanyEmployee::getCompanyId)
                .distinct()
                .toList();

        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return employees.stream()
                .map(employee -> toDto(employee, companies.getOrDefault(employee.getCompanyId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyEmployeeDto getCompanyEmployeeById(String id) {
        CompanyEmployee employee = companyEmployeeRepository.findById(id).orElse(null);
        if (employee == null) {
            return null;
        }

        String companyName = companyRepository.findById(employee.getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return toDto(employee, companyName);
    }

    @Override
    public boolean createCompanyEmployee(CompanyEmployeeCreateDto companyEmployee) {
        CompanyEmployee model = new CompanyEmployee();
        model.setEmployeeId(companyEmployee.getId());
        model.setName(companyEmployee.getName());
        model.setDesignation(companyEmployee.getDesignation());
        model.setEmail(companyEmployee.getEmail());
        model.setCompanyId(companyEmployee.getCompanyId());
        model.setProfileUrl(companyEmployee.getProfileUrl());
        companyEmployeeRepository.save(model);
        return true;
    }

    @Override
    public boolean updateCompanyEmployee(String id, CompanyEmployeeCreateDto companyEmployee) {
        if (!companyEmployeeExists(id)) {
            return false;
        }

        CompanyEmployee existingEmployee = companyEmployeeRepository.findById(id).orElse(null);
        if (existingEmployee == null) {
            return false;
        }

        existingEmployee.setName(companyEmployee.getName());
        existingEmployee.setDesignation(companyEmployee.getDesignation());
        existingEmployee.setEmail(companyEmployee.getEmail());
        existingEmployee.setCompanyId(companyEmployee.getCompanyId());
        existingEmployee.setProfileUrl(companyEmployee.getProfileUrl());
        companyEmployeeRepository.save(existingEmployee);
        return true;
    }

    @Override
    public boolean deleteCompanyEmployee(String id) {
        if (!companyEmployeeRepository.existsById(id)) {
            return false;
        }
        companyEmployeeRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean companyEmployeeExists(String id) {
        return companyEmployeeRepository.existsById(id);
    }

    private CompanyEmployeeDto toDto(CompanyEmployee employee, String companyName) {
        CompanyEmployeeDto dto = new CompanyEmployeeDto();
        dto.setName(employee.getName());
        dto.setDesignation(employee.getDesignation());
        dto.setEmail(employee.getEmail());
        dto.setProfileUrl(employee.getProfileUrl());
        dto.setCompanyname(companyName);
        return dto;
    }
}
