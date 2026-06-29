package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.FoodReview.FoodReviewCreateDto;
import com.example.placementicsbackend.dtos.FoodReview.FoodReviewDto;
import com.example.placementicsbackend.services.Feedback.Interfaces.IFoodReviewService;
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
    public ResponseEntity<List<FoodReviewDto>> getFoodItems() {
        return ResponseEntity.ok(foodReviewService.getAllFoodItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodReviewDto> getFoodItem(@PathVariable Integer id) {
        FoodReviewDto foodItem = foodReviewService.getFoodItemById(id);
        if (foodItem == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(foodItem);
    }

    @PostMapping
    public ResponseEntity<FoodReviewDto> createFoodItem(@RequestBody FoodReviewCreateDto foodItem) {
        if (foodItem == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(foodReviewService.createFoodItem(foodItem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFoodItem(@PathVariable Integer id, @RequestBody FoodReviewCreateDto foodItem) {
        if (!foodReviewService.updateFoodItem(id, foodItem)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Integer id) {
        if (!foodReviewService.deleteFoodItem(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
