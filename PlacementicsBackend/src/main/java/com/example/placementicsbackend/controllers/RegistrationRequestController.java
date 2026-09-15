package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.registration.RegistrationRequestCreate;
import com.example.placementicsbackend.dto.registration.RegistrationRequestResponse;
import com.example.placementicsbackend.models.enums.RegistrationStatus;
import com.example.placementicsbackend.services.RegistrationRequestService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/registration-requests")
@RequiredArgsConstructor
@Tag(name = "Registration Requests")
public class RegistrationRequestController {

    private final RegistrationRequestService service;

    @GetMapping
    public List<RegistrationRequestResponse> findAll(
            @RequestParam UUID collegeId,
            @RequestParam(required = false) RegistrationStatus status
    ) {
        return service.findAll(collegeId, status);
    }

    @GetMapping("/{id}")
    public RegistrationRequestResponse findById(@PathVariable UUID id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<RegistrationRequestResponse> submit(
            @Valid @RequestBody RegistrationRequestCreate request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.submit(request));
    }

    @PatchMapping("/{id}/approve")
    public RegistrationRequestResponse approve(@PathVariable UUID id) {
        return service.approve(id);
    }

    @PatchMapping("/{id}/reject")
    public RegistrationRequestResponse reject(@PathVariable UUID id) {
        return service.reject(id);
    }
}
