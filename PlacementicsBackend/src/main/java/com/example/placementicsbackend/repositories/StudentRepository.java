package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Student;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {

    List<Student> findByIdIn(List<String> ids);
}
