package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.models.Company;
import java.util.List;

public interface ICompanyService {

    List<Company> getAllCompanies();

    Company getCompanyById(String id);

    Company createCompany(Company company);

    boolean updateCompany(String id, Company company);

    boolean deleteCompany(String id);

    boolean companyExists(String id);
}
