package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.college.CollegeRequest;
import com.example.placementicsbackend.dto.college.CollegeResponse;
import com.example.placementicsbackend.services.CollegeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/colleges")
@RequiredArgsConstructor
@Tag(name = "Colleges", description = "Colleges information management APIs")
public class CollegeController {

    private final CollegeService collegeService;

    @GetMapping
    @Operation(summary = "List colleges", description = "Optionally filter by name (case-insensitive contains)")
    public List<CollegeResponse> list(@RequestParam(required = false) String name) {
        return collegeService.findAll(name);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a college by id")
    public CollegeResponse getById(@PathVariable UUID id) {
        return collegeService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Create a college")
    public ResponseEntity<CollegeResponse> create(@Valid @RequestBody CollegeRequest request) {
        CollegeResponse created = collegeService.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a college")
    public CollegeResponse update(@PathVariable UUID id, @Valid @RequestBody CollegeRequest request) {
        return collegeService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a college")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        collegeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
