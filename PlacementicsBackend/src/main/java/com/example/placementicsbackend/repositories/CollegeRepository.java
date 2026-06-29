package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.College;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollegeRepository extends JpaRepository<College, Integer> {
}
