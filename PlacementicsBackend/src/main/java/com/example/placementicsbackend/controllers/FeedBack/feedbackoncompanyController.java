package com.example.placementicsbackend.controllers.FeedBack;

import com.placementcellbackend.dto.feedbackcompany.AlumniFeedbackOnCompanyCreateDto;
import com.placementcellbackend.dto.feedbackcompany.AlumniFeedbackOnCompanyDto;
import com.placementcellbackend.services.feedback.interfaces.IFeedbackOnCompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback-on-company")
@RequiredArgsConstructor
public class FeedbackOnCompanyController {

    private final IFeedbackOnCompanyService feedbackService;

    @GetMapping
    public ResponseEntity<List<AlumniFeedbackOnCompanyDto>> getFeedbackOnCompany() {

        List<AlumniFeedbackOnCompanyDto> feedbacks =
                feedbackService.getAllFeedbacks();

        return ResponseEntity.ok(feedbacks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniFeedbackOnCompanyDto> getFeedback(
            @PathVariable String id) {

        AlumniFeedbackOnCompanyDto feedback =
                feedbackService.getFeedbackById(id);

        if (feedback == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(feedback);
    }

    @PostMapping
    public ResponseEntity<AlumniFeedbackOnCompanyDto> postFeedbackOnCompany(
            @RequestBody AlumniFeedbackOnCompanyCreateDto feedback) {

        AlumniFeedbackOnCompanyDto created =
                feedbackService.createFeedback(feedback);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> putFeedback(
            @PathVariable Integer id,
            @RequestBody AlumniFeedbackOnCompanyCreateDto updatedFeedback) {

        boolean success =
                feedbackService.updateFeedback(id, updatedFeedback);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(
            @PathVariable Integer id) {

        boolean success =
                feedbackService.deleteFeedback(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}