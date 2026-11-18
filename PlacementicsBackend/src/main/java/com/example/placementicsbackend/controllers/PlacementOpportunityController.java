package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.placementOpportunity.*;
import com.example.placementicsbackend.models.enums.OpportunityStatus;
import com.example.placementicsbackend.services.PlacementOpportunityService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "List placement opportunities")
    public List<PlacementOpportunityResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/college/{collegeId}/draft")
    @Operation(summary = "List draft placement opportunities for a college")
    public List<PlacementOpportunityResponse> findDraftByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findDraftByCollege(collegeId);
    }

    @GetMapping("/college/{collegeId}/approved")
    @Operation(summary = "List approved placement opportunities for a college")
    public List<PlacementOpportunityResponse> findApprovedByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findApprovedByCollege(collegeId);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a placement opportunity by ID")
    public PlacementOpportunityResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "List placement opportunities by status")
    public List<PlacementOpportunityResponse> findByStatus(
            @PathVariable OpportunityStatus status
    ) {
        return service.findByStatus(status);
    }

    @PostMapping
    @Operation(summary = "Create a placement opportunity")
    public ResponseEntity<PlacementOpportunityResponse> create(
            @Valid @RequestBody PlacementOpportunityRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a placement opportunity")
    public PlacementOpportunityResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody PlacementOpportunityRequest request
    ) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update a placement opportunity status")
    public PlacementOpportunityResponse updateStatus(
            @PathVariable UUID id,
            @RequestParam OpportunityStatus status
    ) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a placement opportunity")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}