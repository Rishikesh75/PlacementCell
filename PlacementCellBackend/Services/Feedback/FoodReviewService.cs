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
        var restaurantIds = reviews.Select(r => r.restaurentid).Distinct().ToList();
        var restaurants = await _context.restaurents
            .Where(r => restaurantIds.Contains(r.restaurentid))
            .ToDictionaryAsync(r => r.restaurentid, r => r.name);

        // Step 3: Get unique company IDs and fetch company names
        var companyIds = reviews.Select(r => r.companyid).Distinct().ToList();
        var companies = await _context.company
            .Where(c => companyIds.Contains(c.company_id))
            .ToDictionaryAsync(c => c.company_id, c => c.company_name);

        // Step 4: Map to DTOs
        var result = reviews.Select(review => new FoodReviewDtos
        {
            Id = review.id,
            RestaurentName = restaurants.TryGetValue(review.restaurentid, out var restName) 
                ? restName : "Unknown",
            RestaurentId = review.restaurentid,
            CompanyName = companies.TryGetValue(review.companyid, out var compName) 
                ? compName : "Unknown",
            CompanyId = review.companyid,
            Description = review.description,
            Rating = review.rating,
            Date = review.date
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
            .Where(r => r.restaurentid == review.restaurentid)
            .Select(r => r.name)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Get company name
        var companyName = await _context.company
            .Where(c => c.company_id == review.companyid)
            .Select(c => c.company_name)
            .FirstOrDefaultAsync() ?? "Unknown";

        return new FoodReviewDtos
        {
            Id = review.id,
            RestaurentName = restaurantName,
            RestaurentId = review.restaurentid,
            CompanyName = companyName,
            CompanyId = review.companyid,
            Description = review.description,
            Rating = review.rating,
            Date = review.date
        };
    }

    public async Task<FoodReviewDtos> CreateFoodItemAsync(FoodReviewCreateDtos food)
    {
        // Map DTO to Model
        var foodModel = new FoodReview
        {
            restaurentid = food.restaurentid,
            companyid = food.companyid,
            description = food.description,
            rating = food.rating,
            date = food.date
        };

        _context.foodReview.Add(foodModel);
        await _context.SaveChangesAsync();

        // Get restaurant name for response
        var restaurantName = await _context.restaurents
            .Where(r => r.restaurentid == food.restaurentid)
            .Select(r => r.name)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Get company name for response
        var companyName = await _context.company
            .Where(c => c.company_id == food.companyid)
            .Select(c => c.company_name)
            .FirstOrDefaultAsync() ?? "Unknown";

        // Return DTO with all info
        return new FoodReviewDtos
        {
            Id = foodModel.id,
            RestaurentName = restaurantName,
            RestaurentId = foodModel.restaurentid,
            CompanyName = companyName,
            CompanyId = foodModel.companyid,
            Description = foodModel.description,
            Rating = foodModel.rating,
            Date = foodModel.date
        };
    }

    public async Task<bool> UpdateFoodItemAsync(int id, FoodReviewCreateDtos food)
    {
        var existing = await _context.foodReview.FindAsync(id);
        if (existing == null)
            return false;

        // Update properties from DTO
        existing.restaurentid = food.restaurentid;
        existing.companyid = food.companyid;
        existing.description = food.description;
        existing.rating = food.rating;
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

