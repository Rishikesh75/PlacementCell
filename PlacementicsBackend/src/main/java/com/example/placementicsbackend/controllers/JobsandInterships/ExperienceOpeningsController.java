package com.example.placementicsbackend.controllers.JobsandInterships;

import com.example.dto.AlumniJobOpeningCreateDto;
import com.example.dto.AlumniJobOpeningDto;
import com.example.service.AlumniPlacementService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/experience-openings")
public class ExperienceOpeningsController {

    private final AlumniPlacementService alumniPlacementService;

    public ExperienceOpeningsController(
            AlumniPlacementService alumniPlacementService) {
        this.alumniPlacementService = alumniPlacementService;
    }

    /**
     * Get all Alumni Job Openings
     */
    @GetMapping
    public ResponseEntity<List<AlumniJobOpeningDto>> getAllAlumniJobPositions() {

        List<AlumniJobOpeningDto> placements =
                alumniPlacementService.getAllAlumniJobPositions();

        return ResponseEntity.ok(placements);
    }

    /**
     * Get Alumni Job Opening by Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<AlumniJobOpeningDto> getAlumniPlacementById(
            @PathVariable Integer id) {

        AlumniJobOpeningDto placement =
                alumniPlacementService.getAlumniPlacementById(id);

        if (placement == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(placement);
    }

    /**
     * Create Alumni Job Opening
     */
    @PostMapping
    public ResponseEntity<Boolean> createAlumniPlacement(
            @RequestBody AlumniJobOpeningCreateDto alumniPlacement) {

        boolean created =
                alumniPlacementService.createAlumniPlacement(alumniPlacement);

        if (!created) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(false);
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(true);
    }

    /**
     * Update Alumni Job Opening
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateAlumniPlacement(
            @PathVariable Integer id,
            @RequestBody AlumniJobOpeningCreateDto updatedAlumniPlacement) {

        boolean success =
                alumniPlacementService.updateAlumniPlacement(
                        id,
                        updatedAlumniPlacement);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    /**
     * Delete Alumni Job Opening
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlumniPlacement(
            @PathVariable Integer id) {

        boolean success =
                alumniPlacementService.deleteAlumniPlacement(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}