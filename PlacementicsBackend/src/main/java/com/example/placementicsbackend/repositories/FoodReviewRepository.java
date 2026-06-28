package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.FoodReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodReviewRepository extends JpaRepository<FoodReview, Integer> {
}
