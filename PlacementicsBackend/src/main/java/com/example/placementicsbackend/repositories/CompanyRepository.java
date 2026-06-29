package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Company;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, String> {

    List<Company> findByCompanyIdIn(List<String> companyIds);
}
