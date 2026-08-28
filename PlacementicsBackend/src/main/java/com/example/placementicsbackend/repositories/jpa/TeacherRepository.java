package com.example.placementicsbackend.repositories.jpa;

import com.example.placementicsbackend.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdNot(String email, UUID id);

    List<Teacher> findByNameContainingIgnoreCaseOrderByNameAsc(String name);

    List<Teacher> findAllByOrderByNameAsc();

    List<Teacher> findByCollegeIdOrderByNameAsc(UUID collegeId);

    List<Teacher> findByDepartmentIgnoreCaseOrderByNameAsc(String department);

    List<Teacher> findByJoiningYearOrderByNameAsc(Integer joiningYear);
}