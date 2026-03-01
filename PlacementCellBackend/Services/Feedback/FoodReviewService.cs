using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.FoodReview;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Services.Feedback;

public class FoodReviewService : IFoodReviewService
{
    private readonly AppDbContext _context;

    public FoodReviewService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FoodReviewDtos>> GetAllFoodItemsAsync()
    {
        // Step 1: Get all reviews
        var reviews = await _context.foodReview.ToListAsync();

        if (!reviews.Any())
        {
            return Enumerable.Empty<FoodReviewDtos>();
        }

        // Step 2: Get unique restaurant IDs and fetch restaurant names
        var restaurantIds = reviews.Select(r => r.RestaurentId).Distinct().ToList();
        var restaurants = await _context.restaurents
            .Where(r => restaurantIds.Contains(r.RestaurentId))
            .ToDictionaryAsync(r => r.RestaurentId, r => r.name);

        // Step 3: Get unique company IDs and fetch company names
        var CompanyIds = reviews.Select(r => r.CompanyId).Distinct().ToList();
        var companies = await _context.company
            .Where(c => CompanyIds.Contains(c.CompanyId))
            .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

        // Step 4: Map to DTOs
        var result = reviews.Select(review => new FoodReviewDtos
        {
            Id = review.Id,
            RestaurentName = restaurants.TryGetValue(review.RestaurentId, out var restName) 
                ? restName : "Unknown",
            RestaurentId = review.RestaurentId,
            CompanyName = companies.TryGetValue(review.CompanyId, out var compName) 
                ? compName : "Unknown",
            CompanyId = review.CompanyId,
            Description = review.Description,
            Rating = review.Rating,
            Date = review.Date
        }).ToList();

        return result;
    }

    public async Task<FoodReviewDtos?> GetFoodItemByIdAsync(int id)
    {
        var review = await _context.foodReview.FindAsync(id);

        if (review == null)
        {
            return null;
        }

        // Get restaurant name
        var restaurantName = await _context.restaurents
            .Where(r => r.RestaurentId == review.RestaurentId)
            .Select(r => r.name)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Get company name
        var companyName = await _context.company
            .Where(c => c.CompanyId == review.CompanyId)
            .Select(c => c.CompanyName)
            .FirstOrDefaultAsync() ?? "Unknown";

        return new FoodReviewDtos
        {
            Id = review.Id,
            RestaurentName = restaurantName,
            RestaurentId = review.RestaurentId,
            CompanyName = companyName,
            CompanyId = review.CompanyId,
            Description = review.Description,
            Rating = review.Rating,
            Date = review.Date
        };
    }

    public async Task<FoodReviewDtos> CreateFoodItemAsync(FoodReviewCreateDtos food)
    {
        // Map DTO to Model
        var foodModel = new FoodReview
        {
            RestaurentId = food.RestaurentId,
            CompanyId = food.CompanyId,
            Description = food.Description,
            Rating = food.Rating,
            Date = food.Date
        };

        _context.foodReview.Add(foodModel);
        await _context.SaveChangesAsync();

        // Get restaurant name for response
        var restaurantName = await _context.restaurents
            .Where(r => r.RestaurentId == food.RestaurentId)
            .Select(r => r.name)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Get company name for response
        var companyName = await _context.company
            .Where(c => c.CompanyId == food.CompanyId)
            .Select(c => c.CompanyName)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Return DTO with all info
        return new FoodReviewDtos
        {
            Id = foodModel.Id,
            RestaurentName = restaurantName,
            RestaurentId = foodModel.RestaurentId,
            CompanyName = companyName,
            CompanyId = foodModel.CompanyId,
            Description = foodModel.Description,
            Rating = foodModel.Rating,
            Date = foodModel.Date
        };
    }

    public async Task<bool> UpDateFoodItemAsync(int id, FoodReviewCreateDtos food)
    {
        var existing = await _context.foodReview.FindAsync(id);
        if (existing == null)
            return false;

        // UpDate properties from DTO
        existing.RestaurentId = food.RestaurentId;
        existing.CompanyId = food.CompanyId;
        existing.Description = food.Description;
        existing.Rating = food.Rating;
        existing.Date = food.Date;

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

