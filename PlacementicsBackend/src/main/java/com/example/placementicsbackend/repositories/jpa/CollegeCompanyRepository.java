package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.CollegeCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CollegeCompanyRepository extends JpaRepository<CollegeCompany, UUID> {

    boolean existsByCollegeIdAndCompanyId(UUID collegeId, UUID companyId);

    Optional<CollegeCompany> findByCollegeIdAndCompanyId(UUID collegeId, UUID companyId);

    boolean existsByCollegeIdAndCompanyKey(UUID collegeId, String companyKey);

    Optional<CollegeCompany> findByCollegeIdAndCompanyKey(UUID collegeId, String companyKey);
}
