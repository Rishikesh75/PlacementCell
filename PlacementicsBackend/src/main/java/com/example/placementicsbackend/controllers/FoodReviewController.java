package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.FoodReview.FoodReviewCreateDto;
import com.example.placementicsbackend.dtos.FoodReview.FoodReviewDto;
import com.example.placementicsbackend.services.Interfaces.IFoodReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foodreview")
@RequiredArgsConstructor
public class FoodReviewController {

        private final IFoodReviewService foodReviewService;

        @GetMapping
        public ResponseEntity<List<FoodReviewDto>> getFoodReviews()
        {
            return ResponseEntity.ok(foodReviewService.getAllFoodReviews());
        }

        @GetMapping("/{id}")
        public ResponseEntity<FoodReviewDto> getFoodReview(@PathVariable Integer id) {
            FoodReviewDto foodItem = foodReviewService.getFoodReviewById(id);
            if (foodItem == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(foodItem);
        }

        @PostMapping
        public ResponseEntity<FoodReviewDto> createFoodReview(@RequestBody FoodReviewCreateDto foodItem) {
            if (foodItem == null) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(foodReviewService.createFoodReview(foodItem));
        }

        @PutMapping("/{id}")
        public ResponseEntity<Void> updateFoodReview(@PathVariable Integer id, @RequestBody FoodReviewCreateDto foodItem) {
            if (!foodReviewService.updateFoodReview(id, foodItem)) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.noContent().build();
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteFoodReview(@PathVariable Integer id) {
            if (!foodReviewService.deleteFoodReview(id)) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.noContent().build();
        }
}
