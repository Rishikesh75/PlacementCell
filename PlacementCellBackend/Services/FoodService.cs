using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class FoodService : IFoodService
    {
        private readonly AppDbContext _context;

        public FoodService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Food>> GetAllFoodItemsAsync()
        {
            return await _context.food.ToListAsync();
        }

        public async Task<Food?> GetFoodItemByIdAsync(int id)
        {
            return await _context.food.FindAsync(id);
        }

        public async Task<Food> CreateFoodItemAsync(Food food)
        {
            _context.food.Add(food);
            await _context.SaveChangesAsync();
            return food;
        }

        public async Task<bool> UpdateFoodItemAsync(int id, Food food)
        {
            var existing = await _context.food.FindAsync(id);
            if (existing == null)
                return false;

            existing.restaurentid = food.restaurentid;
            existing.companyid = food.companyid;
            existing.description = food.description;
            existing.date = food.date;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFoodItemAsync(int id)
        {
            var food = await _context.food.FindAsync(id);
            if (food == null)
                return false;

            _context.food.Remove(food);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

