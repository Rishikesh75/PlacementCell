package com.example.placementicsbackend.controllers.FeedBack;

import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyCreateDto;
import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyDto;
import com.example.placementicsbackend.services.feedback.interfaces.IFeedbackOnCompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback-on-company")
@RequiredArgsConstructor
public class feedbackoncompanyController {

    private final IFeedbackOnCompanyService feedbackService;

    @GetMapping
    public ResponseEntity<List<AlumniFeedbackOnCompanyDto>> getFeedbackOnCompany() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniFeedbackOnCompanyDto> getFeedback(@PathVariable String id) {
        AlumniFeedbackOnCompanyDto feedback = feedbackService.getFeedbackById(id);
        if (feedback == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }

    @PostMapping
    public ResponseEntity<AlumniFeedbackOnCompanyDto> postFeedbackOnCompany(
            @RequestBody AlumniFeedbackOnCompanyCreateDto feedback) {
        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.createFeedback(feedback));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putFeedback(
            @PathVariable Integer id,
            @RequestBody AlumniFeedbackOnCompanyCreateDto updatedFeedback) {
        if (!feedbackService.updateFeedback(id, updatedFeedback)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Integer id) {
        if (!feedbackService.deleteFeedback(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
