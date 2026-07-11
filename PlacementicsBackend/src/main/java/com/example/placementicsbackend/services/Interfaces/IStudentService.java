package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.models.Student;
import java.util.List;

public interface IStudentService {

    List<Student> getAllStudents();

    Student getStudentById(String id);

    Student createStudent(Student student);

    boolean updateStudent(String id, Student student);

    boolean deleteStudent(String id);
}
