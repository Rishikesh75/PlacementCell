package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.common.IdResponse;
import com.example.placementicsbackend.dto.tpo.*;
import com.example.placementicsbackend.services.TPOService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tpos")
@RequiredArgsConstructor
@Tag(name = "TPOs")
public class TPOController {

    private final TPOService service;

    @GetMapping
    @Operation(summary = "List TPOs")
    public List<TPOResponse> findAll(
            @RequestParam(required = false) String name
    ) {
        return service.findAll(name);
    }

    @GetMapping("/by-email")
    @Operation(summary = "Find a TPO account by email")
    public IdResponse findIdByEmail(
            @RequestParam String email,
            @RequestParam UUID collegeId,
            @RequestParam String password
    ) {
        return new IdResponse(service.findIdByEmail(email, collegeId, password));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a TPO by ID")
    public TPOResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @GetMapping("/college/{collegeId}")
    @Operation(summary = "List TPOs by college")
    public List<TPOResponse> findByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findByCollege(collegeId);
    }

    @PostMapping
    @Operation(summary = "Create a TPO")
    public ResponseEntity<TPOResponse> create(
            @Valid @RequestBody TPORequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a TPO")
    public TPOResponse update(
            @PathVariable UUID id,
            @Valid @RequestBody TPORequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a TPO")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}