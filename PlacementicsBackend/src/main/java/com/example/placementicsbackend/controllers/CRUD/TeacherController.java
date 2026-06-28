package com.example.placementicsbackend.controllers.CRUD;
import com.example.model.Teacher;
import com.example.service.TeacherService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeachersController {

    private final TeacherService teacherService;

    public TeachersController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    /**
     * Get all teachers
     */
    @GetMapping
    public ResponseEntity<List<Teacher>> getTeachers() {

        List<Teacher> teachers = teacherService.getAllTeachers();

        return ResponseEntity.ok(teachers);
    }

    /**
     * Get teacher by Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacher(
            @PathVariable String id) {

        Teacher teacher = teacherService.getTeacherById(id);

        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(teacher);
    }

    /**
     * Create teacher
     */
    @PostMapping
    public ResponseEntity<Teacher> postTeacher(
            @RequestBody Teacher teacher) {

        Teacher created = teacherService.createTeacher(teacher);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    /**
     * Update teacher
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> putTeacher(
            @PathVariable String id,
            @RequestBody Teacher updatedTeacher) {

        // Validate path id with request body id
        if (!id.equals(updatedTeacher.getId())) {
            return ResponseEntity.badRequest().build();
        }

        boolean success =
                teacherService.updateTeacher(id, updatedTeacher);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * Delete teacher
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(
            @PathVariable String id) {

        boolean success =
                teacherService.deleteTeacher(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}