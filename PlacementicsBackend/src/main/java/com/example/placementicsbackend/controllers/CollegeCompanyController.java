package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.collegeCompany.*;
import com.example.placementicsbackend.services.CollegeCompanyService;
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
    public List<CollegeCompanyResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CollegeCompanyResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}/company/{companyId}")
    public CollegeCompanyResponse findByCollegeAndCompany(
            @PathVariable UUID collegeId,
            @PathVariable UUID companyId
    ) {
        return service.findByCollegeAndCompany(collegeId, companyId);
    }

    @PostMapping
    public ResponseEntity<CollegeCompanyResponse> create(
            @Valid @RequestBody CollegeCompanyRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public CollegeCompanyResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody CollegeCompanyRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}