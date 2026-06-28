package com.example.placementicsbackend.services.crud.impl;

import com.example.placementicsbackend.models.Student;
import com.example.placementicsbackend.repositories.StudentRepository;
import com.example.placementicsbackend.services.crud.interfaces.IStudentService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentService implements IStudentService {

    private final StudentRepository studentRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Student getStudentById(String id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public boolean updateStudent(String id, Student student) {
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if (existingStudent == null) {
            return false;
        }

        existingStudent.setName(student.getName());
        existingStudent.setMajor(student.getMajor());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setGraduationYear(student.getGraduationYear());
        existingStudent.setPhoneNo(student.getPhoneNo());
        studentRepository.save(existingStudent);
        return true;
    }

    @Override
    public boolean deleteStudent(String id) {
        if (!studentRepository.existsById(id)) {
            return false;
        }
        studentRepository.deleteById(id);
        return true;
    }
}
