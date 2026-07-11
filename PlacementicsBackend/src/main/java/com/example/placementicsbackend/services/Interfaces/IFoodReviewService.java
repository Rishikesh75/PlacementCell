package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.dtos.FoodReview.FoodReviewCreateDto;
import com.example.placementicsbackend.dtos.FoodReview.FoodReviewDto;
import java.util.List;

public interface IFoodReviewService {

    List<FoodReviewDto> getAllFoodReviews();

    FoodReviewDto getFoodReviewById(int id);

    FoodReviewDto createFoodReview(FoodReviewCreateDto food);

    boolean updateFoodReview(int id, FoodReviewCreateDto food);

    boolean deleteFoodReview(int id);
}
