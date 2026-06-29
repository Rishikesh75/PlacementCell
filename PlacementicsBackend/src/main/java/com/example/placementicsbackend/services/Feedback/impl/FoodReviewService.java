package com.example.placementicsbackend.services.Feedback.impl;

import com.example.placementicsbackend.dtos.FoodReview.FoodReviewCreateDto;
import com.example.placementicsbackend.dtos.FoodReview.FoodReviewDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.FoodReview;
import com.example.placementicsbackend.models.Restaurents;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.repositories.FoodReviewRepository;
import com.example.placementicsbackend.repositories.RestaurentsRepository;
import com.example.placementicsbackend.services.Feedback.Interfaces.IFoodReviewService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FoodReviewService implements IFoodReviewService {

    private final FoodReviewRepository foodReviewRepository;
    private final RestaurentsRepository restaurentsRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<FoodReviewDto> getAllFoodItems() {
        List<FoodReview> reviews = foodReviewRepository.findAll();
        if (reviews.isEmpty()) {
            return List.of();
        }

        List<Integer> restaurantIds = reviews.stream()
                .map(review -> review.getRestaurant().getId())
                .distinct()
                .toList();
        Map<Integer, String> restaurants = restaurentsRepository.findByIdIn(restaurantIds).stream()
                .collect(Collectors.toMap(Restaurents::getId, Restaurents::getName));

        List<String> companyIds = reviews.stream()
                .map(review -> review.getCompany().getCompanyId())
                .distinct()
                .toList();
        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return reviews.stream()
                .map(review -> toDto(
                        review,
                        restaurants.getOrDefault(review.getRestaurant().getId(), "Unknown"),
                        companies.getOrDefault(review.getCompany().getCompanyId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public FoodReviewDto getFoodItemById(int id) {
        FoodReview review = foodReviewRepository.findById(id).orElse(null);
        if (review == null) {
            return null;
        }

        String restaurantName = restaurentsRepository.findById(review.getRestaurant().getId())
                .map(Restaurents::getName)
                .orElse("Unknown");
        String companyName = companyRepository.findById(review.getCompany().getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return toDto(review, restaurantName, companyName);
    }

    @Override
    public FoodReviewDto createFoodItem(FoodReviewCreateDto food) {
        Restaurents restaurant = restaurentsRepository.findById(food.getRestaurentId())
                .orElseThrow(() -> new IllegalArgumentException("Restaurant not found"));
        Company company = companyRepository.findById(food.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        FoodReview foodModel = new FoodReview();
        foodModel.setRestaurant(restaurant);
        foodModel.setCompany(company);
        foodModel.setDescription(food.getDescription());
        foodModel.setRating(food.getRating());
        foodModel.setDate(food.getDate());

        FoodReview saved = foodReviewRepository.save(foodModel);
        return toDto(saved, restaurant.getName(), company.getCompanyName());
    }

    @Override
    public boolean updateFoodItem(int id, FoodReviewCreateDto food) {
        FoodReview existing = foodReviewRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        Restaurents restaurant = restaurentsRepository.findById(food.getRestaurentId()).orElse(null);
        Company company = companyRepository.findById(food.getCompanyId()).orElse(null);
        if (restaurant == null || company == null) {
            return false;
        }

        existing.setRestaurant(restaurant);
        existing.setCompany(company);
        existing.setDescription(food.getDescription());
        existing.setRating(food.getRating());
        existing.setDate(food.getDate());
        foodReviewRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteFoodItem(int id) {
        if (!foodReviewRepository.existsById(id)) {
            return false;
        }
        foodReviewRepository.deleteById(id);
        return true;
    }

    private FoodReviewDto toDto(FoodReview review, String restaurantName, String companyName) {
        FoodReviewDto dto = new FoodReviewDto();
        dto.setId(review.getRecordId());
        dto.setRestaurentName(restaurantName);
        dto.setRestaurentId(review.getRestaurant().getId());
        dto.setCompanyName(companyName);
        dto.setCompanyId(review.getCompany().getCompanyId());
        dto.setDescription(review.getDescription());
        dto.setRating(review.getRating());
        dto.setDate(review.getDate());
        return dto;
    }
}
