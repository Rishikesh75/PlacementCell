package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Placement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementRepository extends JpaRepository<Placement, Integer> {
}
