package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.College;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CollegeRepository extends JpaRepository<College, UUID> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdNot(String name, UUID id);

    List<College> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<College> findAllByOrderByNameAsc();
}
