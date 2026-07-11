package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.models.Student;
import com.example.placementicsbackend.services.Interfaces.IStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final IStudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        List<Student> students = studentService.getAllStudents();

        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable String id) {

        Student student = studentService.getStudentById(id);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(
            @RequestBody Student student) {

        Student created = studentService.createStudent(student);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateStudent(
            @PathVariable String id,
            @RequestBody Student student) {

        if (!id.equals(student.getId())) {
            return ResponseEntity.badRequest().build();
        }

        boolean success = studentService.updateStudent(id, student);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(
            @PathVariable String id) {

        boolean success = studentService.deleteStudent(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}