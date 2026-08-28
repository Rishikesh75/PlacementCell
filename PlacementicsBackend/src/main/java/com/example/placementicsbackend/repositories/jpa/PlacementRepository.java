package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PlacementRepository extends JpaRepository<Placement, UUID> {

    List<Placement> findByStudentIdOrderByPlacementDateDesc(UUID studentId);

    List<Placement> findByCollegeCompanyIdOrderByPlacementDateDesc(
            UUID collegeCompanyId
    );

    List<Placement> findAllByOrderByPlacementDateDesc();
}