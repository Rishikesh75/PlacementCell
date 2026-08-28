package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, UUID id);

    List<Company> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<Company> findAllByOrderByNameAsc();

    List<Company> findByIndustryIgnoreCaseOrderByNameAsc(String industry);
}