package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.alumni.*;
import com.example.placementicsbackend.dto.common.IdResponse;
import com.example.placementicsbackend.services.AlumniService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/alumni")
@RequiredArgsConstructor
@Tag(name = "Alumni")
public class AlumniController {

    private final AlumniService service;

    @GetMapping
    public List<AlumniResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/by-email")
    public IdResponse findIdByEmail(
            @RequestParam String email,
            @RequestParam UUID collegeId
    ) {
        return new IdResponse(service.findIdByEmail(email, collegeId));
    }

    @GetMapping("/{id}")
    public AlumniResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}")
    public List<AlumniResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @GetMapping("/company/{companyId}")
    public List<AlumniResponse> findByCompany(
            @PathVariable UUID companyId
    ) {
        return service.findByCompany(companyId);
    }

    @GetMapping("/passing-year/{passingYear}")
    public List<AlumniResponse> findByPassingYear(
            @PathVariable Integer passingYear
    ) {
        return service.findByPassingYear(passingYear);
    }

    @PostMapping
    public ResponseEntity<AlumniResponse> create(
            @Valid @RequestBody AlumniRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public AlumniResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody AlumniRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}