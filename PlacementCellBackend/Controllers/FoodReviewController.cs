using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodReviewController : ControllerBase
{
    private readonly IFoodReviewService _foodService;

    public FoodReviewController(IFoodReviewService foodService)
    {
        _foodService = foodService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FoodReview>>> GetFoodItems()
    {
        var foodItems = await _foodService.GetAllFoodItemsAsync();
        return Ok(foodItems);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FoodReview>> GetFoodItem(int id)
    {
        var foodItem = await _foodService.GetFoodItemByIdAsync(id);
        if (foodItem == null)
            return NotFound();
        return Ok(foodItem);
    }

    [HttpPost]
    public async Task<ActionResult<FoodReview>> CreateFoodItem(FoodReview foodItem)
    {
        if (foodItem == null)
            return BadRequest("Food item cannot be null.");

        var created = await _foodService.CreateFoodItemAsync(foodItem);
        return CreatedAtAction(nameof(GetFoodItem), new { id = created.id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFoodItem(int id, FoodReview foodItem)
    {
        if (id != foodItem.id)
            return BadRequest("Food item ID mismatch.");

        var success = await _foodService.UpdateFoodItemAsync(id, foodItem);
        if (!success)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFoodItem(int id)
    {
        var success = await _foodService.DeleteFoodItemAsync(id);
        if (!success)
            return NotFound();

        return NoContent();
    }
}
