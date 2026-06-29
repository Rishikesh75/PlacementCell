package com.example.placementicsbackend.controllers.JobsandInterships;

import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningCreateDto;
import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningDto;
import com.example.placementicsbackend.services.Placements.Interfaces.IAlumniPlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience-openings")
@RequiredArgsConstructor
public class ExperienceOpeningsController {

    private final IAlumniPlacementService alumniPlacementService;

    @GetMapping
    public ResponseEntity<List<AlumniJobOpeningDto>> getAllAlumniJobPositions() {
        return ResponseEntity.ok(alumniPlacementService.getAllAlumniJobPositions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniJobOpeningDto> getAlumniPlacementById(@PathVariable Integer id) {
        AlumniJobOpeningDto placement = alumniPlacementService.getAlumniPlacementById(id);
        if (placement == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(placement);
    }

    @PostMapping
    public ResponseEntity<Boolean> createAlumniPlacement(@RequestBody AlumniJobOpeningCreateDto alumniPlacement) {
        boolean created = alumniPlacementService.createAlumniPlacement(alumniPlacement);
        if (!created) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(true);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAlumniPlacement(
            @PathVariable Integer id,
            @RequestBody AlumniJobOpeningCreateDto updatedAlumniPlacement) {
        if (!alumniPlacementService.updateAlumniPlacement(id, updatedAlumniPlacement)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumniPlacement(@PathVariable Integer id) {
        if (!alumniPlacementService.deleteAlumniPlacement(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
