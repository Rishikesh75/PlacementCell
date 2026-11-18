package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.common.IdResponse;
import com.example.placementicsbackend.dto.teacher.*;
import com.example.placementicsbackend.services.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/teachers")
@RequiredArgsConstructor
@Tag(name = "Teachers")
public class TeacherController {

    private final TeacherService service;

    @GetMapping
    @Operation(summary = "List teachers")
    public List<TeacherResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/by-email")
    @Operation(summary = "Find a teacher account by email")
    public IdResponse findIdByEmail(
            @RequestParam String email,
            @RequestParam UUID collegeId,
            @RequestParam String password
    ) {
        return new IdResponse(service.findIdByEmail(email, collegeId, password));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a teacher by ID")
    public TeacherResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}")
    @Operation(summary = "List teachers by college")
    public List<TeacherResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @PostMapping
    @Operation(summary = "Create a teacher")
    public ResponseEntity<TeacherResponse> create(
            @Valid @RequestBody TeacherRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a teacher")
    public TeacherResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody TeacherRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a teacher")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}