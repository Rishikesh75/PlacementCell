package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.placementOpportunity.*;
import com.example.placementicsbackend.models.enums.OpportunityStatus;
import com.example.placementicsbackend.services.PlacementOpportunityService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/placement-opportunities")
@RequiredArgsConstructor
@Tag(name = "Placement Opportunities")
public class PlacementOpportunityController {

    private final PlacementOpportunityService service;

    @GetMapping
    public List<PlacementOpportunityResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public PlacementOpportunityResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    public List<PlacementOpportunityResponse> findByStatus(
            @PathVariable OpportunityStatus status
    ) {
        return service.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<PlacementOpportunityResponse> create(
            @Valid @RequestBody PlacementOpportunityRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public PlacementOpportunityResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody PlacementOpportunityRequest request
    ) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public PlacementOpportunityResponse updateStatus(
            @PathVariable UUID id,
            @RequestParam OpportunityStatus status
    ) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}