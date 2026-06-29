package com.example.placementicsbackend.services.Feedback.Interfaces;

import com.example.placementicsbackend.dtos.FoodReview.FoodReviewCreateDto;
import com.example.placementicsbackend.dtos.FoodReview.FoodReviewDto;
import java.util.List;

public interface IFoodReviewService {

    List<FoodReviewDto> getAllFoodItems();

    FoodReviewDto getFoodItemById(int id);

    FoodReviewDto createFoodItem(FoodReviewCreateDto food);

    boolean updateFoodItem(int id, FoodReviewCreateDto food);

    boolean deleteFoodItem(int id);
}
