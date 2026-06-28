package com.example.placementicsbackend.controllers;

import com.example.dto.FoodReviewCreateDto;
import com.example.dto.FoodReviewDto;
import com.example.service.FoodReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foodreview")
public class FoodReviewController {

    private final FoodReviewService foodReviewService;

    @Autowired
    public FoodReviewController(FoodReviewService foodReviewService) {
        this.foodReviewService = foodReviewService;
    }

    @GetMapping
    public ResponseEntity<List<FoodReviewDto>> getFoodItems() {
        List<FoodReviewDto> foodItems =
                foodReviewService.getAllFoodItems();
        return ResponseEntity.ok(foodItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodReviewDto> getFoodItem(
            @PathVariable Integer id) {

        FoodReviewDto foodItem =
                foodReviewService.getFoodItemById(id);

        if (foodItem == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(foodItem);
    }

    @PostMapping
    public ResponseEntity<FoodReviewDto> createFoodItem(
            @RequestBody FoodReviewCreateDto foodItem) {

        if (foodItem == null) {
            return ResponseEntity.badRequest().build();
        }

        FoodReviewDto created =
                foodReviewService.createFoodItem(foodItem);

        return ResponseEntity
                .status(201)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateFoodItem(
            @PathVariable Integer id,
            @RequestBody FoodReviewCreateDto foodItem) {

        boolean success =
                foodReviewService.updateFoodItem(id, foodItem);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(
            @PathVariable Integer id) {

        boolean success =
                foodReviewService.deleteFoodItem(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}