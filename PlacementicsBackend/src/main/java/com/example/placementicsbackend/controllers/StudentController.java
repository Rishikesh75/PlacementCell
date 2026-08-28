package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.student.*;
import com.example.placementicsbackend.services.StudentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
@Tag(name = "Students")
public class StudentController {

    private final StudentService service;

    @GetMapping
    public List<StudentResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/{id}")
    public StudentResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}")
    public List<StudentResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @PostMapping
    public ResponseEntity<StudentResponse> create(
            @Valid @RequestBody StudentRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public StudentResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody StudentRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}