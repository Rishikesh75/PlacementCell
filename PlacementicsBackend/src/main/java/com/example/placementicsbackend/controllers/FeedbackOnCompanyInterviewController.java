package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.feedback.*;
import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import com.example.placementicsbackend.services.FeedbackOnCompanyInterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/interview-feedback")
@RequiredArgsConstructor
@Tag(name = "Interview Feedback")
public class FeedbackOnCompanyInterviewController {

    private final FeedbackOnCompanyInterviewService service;

    @GetMapping
    @Operation(summary = "List interview feedback")
    public List<FeedbackOnCompanyInterviewResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get interview feedback by ID")
    public FeedbackOnCompanyInterviewResponse findById(
            @PathVariable String id
    ) {
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "List interview feedback by status")
    public List<FeedbackOnCompanyInterviewResponse> findByStatus(
            @PathVariable FeedbackStatus status
    ) {
        return service.findByStatus(status);
    }

    @GetMapping("/college/{collegeId}/pending")
    @Operation(summary = "List pending interview feedback for a college")
    public List<FeedbackOnCompanyInterviewResponse> findPendingByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findPendingByCollege(collegeId);
    }

    @GetMapping("/college/{collegeId}/approved")
    @Operation(summary = "List approved interview feedback for a college")
    public List<FeedbackOnCompanyInterviewResponse> findApprovedByCollege(
            @PathVariable UUID collegeId
    ) {
        return service.findApprovedByCollege(collegeId);
    }

    @PostMapping
    @Operation(summary = "Submit interview feedback")
    public ResponseEntity<FeedbackOnCompanyInterviewResponse> create(
            @Valid @RequestBody FeedbackOnCompanyInterviewRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update interview feedback")
    public FeedbackOnCompanyInterviewResponse update(
            @PathVariable String id,
            @Valid @RequestBody FeedbackOnCompanyInterviewRequest request
    ) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update interview feedback status")
    public FeedbackOnCompanyInterviewResponse updateStatus(
            @PathVariable String id,
            @RequestParam FeedbackStatus status
    ) {
        return service.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete interview feedback")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}