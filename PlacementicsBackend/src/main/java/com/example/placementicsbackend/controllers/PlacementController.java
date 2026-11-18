package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.placement.*;
import com.example.placementicsbackend.services.PlacementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/placements")
@RequiredArgsConstructor
@Tag(name = "Placements")
public class PlacementController {

    private final PlacementService service;

    @GetMapping
    @Operation(summary = "List placements")
    public List<PlacementResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a placement by ID")
    public PlacementResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/student/{studentId}")
    @Operation(summary = "List placements for a student")
    public List<PlacementResponse> findByStudent(
            @PathVariable UUID studentId
    ) {
        return service.findByStudent(studentId);
    }

    @PostMapping
    @Operation(summary = "Create a placement")
    public ResponseEntity<PlacementResponse> create(
            @Valid @RequestBody PlacementRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a placement")
    public PlacementResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody PlacementRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a placement")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}