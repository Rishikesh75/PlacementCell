package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.common.IdResponse;
import com.example.placementicsbackend.dto.company.*;
import com.example.placementicsbackend.services.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@Tag(name = "Companies")
public class CompanyController {

    private final CompanyService service;

    @GetMapping
    @Operation(summary = "List companies")
    public List<CompanyResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/by-email")
    @Operation(summary = "Find a company account by email")
    public IdResponse findIdByEmail(
            @RequestParam String email,
            @RequestParam UUID collegeId,
            @RequestParam String password
    ) {
        return new IdResponse(service.findIdByEmail(email, collegeId, password));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a company by ID")
    public CompanyResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping
    @Operation(summary = "Create a company")
    public ResponseEntity<CompanyResponse> create(
            @Valid @RequestBody CompanyRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a company")
    public CompanyResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody CompanyRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a company")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}