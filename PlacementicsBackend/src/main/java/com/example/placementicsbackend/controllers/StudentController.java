package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.common.IdResponse;
import com.example.placementicsbackend.dto.student.*;
import com.example.placementicsbackend.services.StudentService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "List students")
    public List<StudentResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/by-email")
    @Operation(summary = "Find a student account by email")
    public IdResponse findIdByEmail(
            @RequestParam String email,
            @RequestParam UUID collegeId,
            @RequestParam String password
    ) {
        return new IdResponse(service.findIdByEmail(email, collegeId, password));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a student by ID")
    public StudentResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}")
    @Operation(summary = "List students by college")
    public List<StudentResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @PostMapping
    @Operation(summary = "Create a student")
    public ResponseEntity<StudentResponse> create(
            @Valid @RequestBody StudentRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a student")
    public StudentResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody StudentRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a student")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}