package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.Alumni;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AlumniRepository extends JpaRepository<Alumni, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<Alumni> findByEmailIgnoreCase(String email);

    Optional<Alumni> findByCollegeIdAndEmailIgnoreCase(UUID collegeId, String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    List<Alumni> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<Alumni> findAllByOrderByNameAsc();

    List<Alumni> findByCollegeIdOrderByNameAsc(UUID collegeId);

    List<Alumni> findByCompanyIdOrderByNameAsc(UUID companyId);

    List<Alumni> findByPassingYearOrderByNameAsc(Integer passingYear);
}
