using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacementController : ControllerBase
    {
        private readonly IPlacementService _placementService;

        public PlacementController(IPlacementService placementService)
        {
            _placementService = placementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Placement>>> GetAllPlacements()
        {
            var placements = await _placementService.GetAllPlacementsAsync();
            return Ok(placements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Placement>> GetPlacementById(int id)
        {
            var placement = await _placementService.GetPlacementByIdAsync(id);
            if (placement == null)
                return NotFound();
            return Ok(placement);
        }

        [HttpPost]
        public async Task<ActionResult<Placement>> CreatePlacement(Placement placement)
        {
            var created = await _placementService.CreatePlacementAsync(placement);
            return CreatedAtAction(nameof(GetPlacementById), new { id = created.id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlacement(int id, Placement updatedPlacement)
        {
            if (id != updatedPlacement.id)
                return BadRequest();

            var success = await _placementService.UpdatePlacementAsync(id, updatedPlacement);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlacement(int id)
        {
            var success = await _placementService.DeletePlacementAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}

