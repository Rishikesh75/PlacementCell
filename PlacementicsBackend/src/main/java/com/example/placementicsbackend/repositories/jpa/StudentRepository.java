package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    boolean existsByCollegeIdAndRollNoIgnoreCase(UUID collegeId, String rollNo);

    boolean existsByCollegeIdAndRollNoIgnoreCaseAndIdNot(
            UUID collegeId,
            String rollNo,
            UUID id
    );

    List<Student> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<Student> findAllByOrderByNameAsc();

    List<Student> findByCollegeIdOrderByNameAsc(UUID collegeId);

    List<Student> findByBatchOrderByNameAsc(String batch);

    List<Student> findByDepartmentIgnoreCaseOrderByNameAsc(String department);
}