package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.PlacementDTOs.CreatePlacementDto;
import com.example.placementicsbackend.dtos.PlacementDTOs.PlacementDTO;
import com.example.placementicsbackend.models.Placement;
import com.example.placementicsbackend.services.Placements.Interfaces.IPlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placement")
@RequiredArgsConstructor
public class PlacementController {

    private final IPlacementService placementService;

    @GetMapping
    public ResponseEntity<List<PlacementDTO>> getAllPlacements() {
        return ResponseEntity.ok(placementService.getAllPlacements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlacementDTO> getPlacementById(@PathVariable Integer id) {
        PlacementDTO placement = placementService.getPlacementById(id);
        if (placement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(placement);
    }

    @PostMapping
    public ResponseEntity<Placement> createPlacement(@RequestBody CreatePlacementDto placementDto) {
        Placement created = placementService.createPlacement(placementDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePlacement(@PathVariable Integer id, @RequestBody CreatePlacementDto updatedPlacement) {
        if (!placementService.updatePlacement(id, updatedPlacement)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlacement(@PathVariable Integer id) {
        if (!placementService.deletePlacement(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
