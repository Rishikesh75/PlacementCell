package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.companyRequest.*;
import com.example.placementicsbackend.models.enums.CompanyRequestStatus;
import com.example.placementicsbackend.services.CompanyRequestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/company-requests")
@RequiredArgsConstructor
@Tag(name = "Company Requests")
public class CompanyRequestController {

    private final CompanyRequestService service;

    @GetMapping
    public List<CompanyRequest_Response> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public CompanyRequest_Response findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    public List<CompanyRequest_Response> findByStatus(
            @PathVariable CompanyRequestStatus status
    ) {
        return service.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<CompanyRequest_Response> create(
            @Valid @RequestBody CompanyRequest_Request request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public CompanyRequest_Response update(
            @PathVariable UUID id,
            @Valid @RequestBody CompanyRequest_Request request
    ) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public CompanyRequest_Response updateStatus(
            @PathVariable UUID id,
            @RequestParam CompanyRequestStatus status
    ) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}