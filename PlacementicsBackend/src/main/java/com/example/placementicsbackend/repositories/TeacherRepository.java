package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Teacher;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, String> {

    List<Teacher> findByIdIn(List<String> ids);
}
