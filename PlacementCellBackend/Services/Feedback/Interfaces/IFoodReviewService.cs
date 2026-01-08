using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Feedback.Interfaces;

public interface IFoodReviewService
{
    Task<IEnumerable<FoodReview>> GetAllFoodItemsAsync();
    Task<FoodReview?> GetFoodItemByIdAsync(int id);
    Task<FoodReview> CreateFoodItemAsync(FoodReview foodReview);
    Task<bool> UpdateFoodItemAsync(int id, FoodReview foodReview);
    Task<bool> DeleteFoodItemAsync(int id);
}

