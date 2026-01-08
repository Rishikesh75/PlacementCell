using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services;

public class FoodReviewService : IFoodReviewService
{
    private readonly AppDbContext _context;

    public FoodReviewService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FoodReview>> GetAllFoodItemsAsync()
    {
        return await _context.foodReview.ToListAsync();
    }

    public async Task<FoodReview?> GetFoodItemByIdAsync(int id)
    {
        return await _context.foodReview.FindAsync(id);
    }

    public async Task<FoodReview> CreateFoodItemAsync(FoodReview food)
    {
        _context.foodReview.Add(food);
        await _context.SaveChangesAsync();
        return food;
    }

    public async Task<bool> UpdateFoodItemAsync(int id, FoodReview food)
    {
        var existing = await _context.foodReview.FindAsync(id);
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
        var food = await _context.foodReview.FindAsync(id);
        if (food == null)
            return false;

        _context.foodReview.Remove(food);
        await _context.SaveChangesAsync();
        return true;
    }
}

