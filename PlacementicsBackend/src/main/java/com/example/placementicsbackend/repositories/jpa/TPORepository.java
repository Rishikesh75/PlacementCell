package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.TPO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TPORepository extends JpaRepository<TPO, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    Optional<TPO> findByEmailIgnoreCase(String email);

    Optional<TPO> findByCollegeIdAndEmailIgnoreCase(UUID collegeId, String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    List<TPO> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<TPO> findAllByOrderByNameAsc();

    List<TPO> findByCollegeIdOrderByNameAsc(UUID collegeId);
}