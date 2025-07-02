using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodController : Controller
    {
        private readonly AppDbContext _context;

        public FoodController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetFoodItems()
        {
            // Logic to retrieve food items from the database
            var foodItems = _context.food.ToList(); // Assuming FoodItems is a DbSet in AppDbContext
            return Ok(foodItems);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetFoodItem(int id)
        {
            // Logic to retrieve a specific food item by ID
            var foodItem = _context.food.Find(id); // Assuming FoodItems is a DbSet in AppDbContext
            if (foodItem == null)
            {
                return NotFound();
            }
            return Ok(foodItem);
        }


        [HttpPost]
        public IActionResult CreateFoodItem(Food foodItem)
        {
            if (foodItem == null)
            {
                return BadRequest("Food item cannot be null.");
            }
            _context.food.Add(foodItem); // Assuming FoodItems is a DbSet in AppDbContext
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetFoodItem), new { id = foodItem.id }, foodItem);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFoodItem(int id, Food foodItem)
        {
            if (id != foodItem.id)
            {
                return BadRequest("Food item ID mismatch.");
            }
            var existingFoodItem = _context.food.Find(id); // Assuming FoodItems is a DbSet in AppDbContext
            if (existingFoodItem == null)
            {
                return NotFound();
            }
            existingFoodItem.restaurentid = foodItem.restaurentid; // Update propertie as needed
            existingFoodItem.companyid = foodItem.companyid;
            existingFoodItem.description = foodItem.description;
            existingFoodItem.date = foodItem.date;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFoodItem(int id)
        {
            var foodItem = _context.food.Find(id); // Assuming FoodItems is a DbSet in AppDbContext
            if (foodItem == null)
            {
                return NotFound();
            }
            _context.food.Remove(foodItem);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
