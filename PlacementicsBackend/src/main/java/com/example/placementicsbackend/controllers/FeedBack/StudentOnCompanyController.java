package com.example.placementicsbackend.controllers.FeedBack;

import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyCreateDto;
import com.example.placementicsbackend.dtos.AlumniFeedBackOnCompanyDTO;
import com.example.placementicsbackend.services.Feedback.Interfaces.IStudentOnCompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback-on-company")
@RequiredArgsConstructor
public class StudentOnCompanyController {

    private final IStudentOnCompanyService feedbackService;

    @GetMapping
    public ResponseEntity<List<AlumniFeedBackOnCompanyDTO>> getFeedbackOnCompany() {
        return ResponseEntity.ok(feedbackService.getAllFeedbacks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlumniFeedBackOnCompanyDTO> getFeedback(@PathVariable String id) {
        AlumniFeedBackOnCompanyDTO feedback = feedbackService.getFeedbackById(id);
        if (feedback == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(feedback);
    }

    @PostMapping
    public ResponseEntity<AlumniFeedBackOnCompanyDTO> postFeedbackOnCompany(
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
