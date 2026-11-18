package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.collegeCompany.*;
import com.example.placementicsbackend.services.CollegeCompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/college-companies")
@RequiredArgsConstructor
@Tag(name = "College Companies")
public class CollegeCompanyController {

    private final CollegeCompanyService service;

    @GetMapping
    @Operation(summary = "List college-company relationships")
    public List<CollegeCompanyResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/college/{collegeId}")
    @Operation(summary = "List companies associated with a college")
    public List<CollegeCompanyResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a college-company relationship by ID")
    public CollegeCompanyResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}/company/{companyId}")
    @Operation(summary = "Get a college-company relationship by college and company")
    public CollegeCompanyResponse findByCollegeAndCompany(
            @PathVariable UUID collegeId,
            @PathVariable UUID companyId,
            @RequestParam String password
    ) {
        return service.findByCollegeAndCompany(collegeId, companyId, password);
    }

    @PostMapping
    @Operation(summary = "Create a college-company relationship")
    public ResponseEntity<CollegeCompanyResponse> create(
            @Valid @RequestBody CollegeCompanyRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a college-company relationship")
    public CollegeCompanyResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody CollegeCompanyRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a college-company relationship")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}