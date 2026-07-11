package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeCreateDto;
import com.example.placementicsbackend.dtos.CompanyEmployee.CompanyEmployeeDto;
import java.util.List;

public interface ICompanyEmployeeService {

    List<CompanyEmployeeDto> getAllCompanyEmployees();

    CompanyEmployeeDto getCompanyEmployeeById(String id);

    boolean createCompanyEmployee(CompanyEmployeeCreateDto companyEmployee);

    boolean updateCompanyEmployee(String id, CompanyEmployeeCreateDto companyEmployee);

    boolean deleteCompanyEmployee(String id);

    boolean companyEmployeeExists(String id);
}
