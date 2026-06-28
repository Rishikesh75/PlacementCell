package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.jobopening.AlumniJobOpenings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumniJobOpeningsRepository extends JpaRepository<AlumniJobOpenings, Integer> {
}
