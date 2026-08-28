package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dto.feedback.*;
import com.example.placementicsbackend.models.mongoDB.enums.FeedbackStatus;
import com.example.placementicsbackend.services.FeedbackOnCompanyInterviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview-feedback")
@RequiredArgsConstructor
@Tag(name = "Interview Feedback")
public class FeedbackOnCompanyInterviewController {

    private final FeedbackOnCompanyInterviewService service;

    @GetMapping
    public List<FeedbackOnCompanyInterviewResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public FeedbackOnCompanyInterviewResponse findById(
            @PathVariable String id
    ) {
        return service.findById(id);
    }

    @GetMapping("/status/{status}")
    public List<FeedbackOnCompanyInterviewResponse> findByStatus(
            @PathVariable FeedbackStatus status
    ) {
        return service.findByStatus(status);
    }

    @PostMapping
    public ResponseEntity<FeedbackOnCompanyInterviewResponse> create(
            @Valid @RequestBody FeedbackOnCompanyInterviewRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.create(request));
    }

    @PutMapping("/{id}")
    public FeedbackOnCompanyInterviewResponse update(
            @PathVariable String id,
            @Valid @RequestBody FeedbackOnCompanyInterviewRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}