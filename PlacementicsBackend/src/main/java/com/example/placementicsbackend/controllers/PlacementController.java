package com.example.placementicsbackend.controllers;

import com.example.dto.CreatePlacementDto;
import com.example.dto.PlacementDto;
import com.example.model.Placement;
import com.example.service.PlacementService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement")
public class PlacementController {

    private final PlacementService placementService;

    public PlacementController(PlacementService placementService) {
        this.placementService = placementService;
    }

    /**
     * Get all placements
     */
    @GetMapping
    public ResponseEntity<List<PlacementDto>> getAllPlacements() {

        List<PlacementDto> placements =
                placementService.getAllPlacements();

        return ResponseEntity.ok(placements);
    }

    /**
     * Get placement by Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<PlacementDto> getPlacementById(
            @PathVariable Integer id) {

        PlacementDto placement =
                placementService.getPlacementById(id);

        if (placement == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(placement);
    }

    /**
     * Create Placement
     */
    @PostMapping
    public ResponseEntity<Placement> createPlacement(
            @RequestBody CreatePlacementDto placementDto) {

        Placement created =
                placementService.createPlacement(placementDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    /**
     * Update Placement
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePlacement(
            @PathVariable Integer id,
            @RequestBody CreatePlacementDto updatedPlacement) {

        boolean success =
                placementService.updatePlacement(id, updatedPlacement);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * Delete Placement
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlacement(
            @PathVariable Integer id) {

        boolean success =
                placementService.deletePlacement(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

}