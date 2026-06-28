package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Alumni;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlumniRepository extends JpaRepository<Alumni, String> {

    List<Alumni> findByIdIn(List<String> ids);
}
