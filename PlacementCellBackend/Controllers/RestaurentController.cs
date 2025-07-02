using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RestaurentController : Controller
    {
        private readonly AppDbContext _context;

        public RestaurentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Restaurents>>> GetAllRestaurents()
        {
            return Ok(await _context.restaurents.ToListAsync());
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Restaurents>> GetRestaurentById(string id)
        {
            var restaurent = await _context.restaurents.FindAsync(id);
            if (restaurent == null)
                return NotFound();
            return Ok(restaurent);
        }
        [HttpPost]
        public async Task<ActionResult<Restaurents>> CreateRestaurent(Restaurents restaurent)
        {
            _context.restaurents.Add(restaurent);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRestaurentById), new { id = restaurent.restaurentid }, restaurent);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRestaurent(int id, Restaurents restaurent)
        {
            if (id != restaurent.restaurentid)
                return BadRequest();
            var existingRestaurent = await _context.restaurents.FindAsync(id);
            if (existingRestaurent == null)
                return NotFound();
            // Update fields
            existingRestaurent.name = restaurent.name;
            existingRestaurent.contact = restaurent.contact;
            existingRestaurent.address = restaurent.address;
            existingRestaurent.rating = restaurent.rating;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRestaurent(int id)
        {
            var restaurent = await _context.restaurents.FindAsync(id);
            if (restaurent == null)
                return NotFound();
            _context.restaurents.Remove(restaurent);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
