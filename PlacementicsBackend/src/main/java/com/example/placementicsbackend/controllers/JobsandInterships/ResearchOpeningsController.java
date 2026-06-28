package com.example.placementicsbackend.controllers.JobsandInterships;

import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningCreateDto;
import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningDto;
import com.example.placementicsbackend.services.placements.interfaces.ITeacherPlacementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research-openings")
@RequiredArgsConstructor
public class ResearchOpeningsController {

    private final ITeacherPlacementService teacherPlacementService;

    @GetMapping
    public ResponseEntity<List<ResearchOpeningDto>> getAllTeacherResearchOpenings() {
        List<ResearchOpeningDto> openings =
                teacherPlacementService.getAllTeacherResearchOpenings();

        return ResponseEntity.ok(openings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResearchOpeningDto> getTeacherResearchOpeningById(
            @PathVariable Integer id) {

        ResearchOpeningDto opening =
                teacherPlacementService.getTeacherResearchOpeningById(id);

        if (opening == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(opening);
    }

    @PostMapping
    public ResponseEntity<ResearchOpeningDto> createTeacherResearchOpening(
            @RequestBody ResearchOpeningCreateDto researchOpening) {

        ResearchOpeningDto created =
                teacherPlacementService.createTeacherResearchOpening(researchOpening);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTeacherResearchOpening(
            @PathVariable Integer id,
            @RequestBody ResearchOpeningCreateDto updatedResearchOpening) {

        boolean success =
                teacherPlacementService.updateTeacherResearchOpening(id, updatedResearchOpening);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacherResearchOpening(
            @PathVariable Integer id) {

        boolean success =
                teacherPlacementService.deleteTeacherResearchOpening(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}