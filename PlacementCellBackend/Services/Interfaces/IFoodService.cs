using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IFoodService
    {
        Task<IEnumerable<Food>> GetAllFoodItemsAsync();
        Task<Food?> GetFoodItemByIdAsync(int id);
        Task<Food> CreateFoodItemAsync(Food food);
        Task<bool> UpdateFoodItemAsync(int id, Food food);
        Task<bool> DeleteFoodItemAsync(int id);
    }
}

