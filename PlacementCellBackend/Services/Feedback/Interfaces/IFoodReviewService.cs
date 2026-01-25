using PlacementCellBackend.DTOs.FoodReview;

namespace PlacementCellBackend.Services.Feedback.Interfaces;

public interface IFoodReviewService
{
    Task<IEnumerable<FoodReviewDtos>> GetAllFoodItemsAsync();
    Task<FoodReviewDtos?> GetFoodItemByIdAsync(int id);
    Task<FoodReviewDtos> CreateFoodItemAsync(FoodReviewCreateDtos foodReview);
    Task<bool> UpdateFoodItemAsync(int id, FoodReviewCreateDtos foodReview);
    Task<bool> DeleteFoodItemAsync(int id);
}

