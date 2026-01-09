using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlumniPlacementController : ControllerBase
    {
        private readonly IAlumniPlacementService _alumniPlacementService;

        public AlumniPlacementController(IAlumniPlacementService alumniPlacementService)
        {
            _alumniPlacementService = alumniPlacementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlumniJobPosition>>> GetAllAlumniJobPosition()
        {
            var placements = await _alumniPlacementService.GetAllAlumniJobPositionAsync();
            return Ok(placements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlumniJobPosition>> GetAlumniPlacementById(int id)
        {
            var placement = await _alumniPlacementService.GetAlumniPlacementByIdAsync(id);
            if (placement == null)
                return NotFound();
            return Ok(placement);
        }

        [HttpPost]
        public async Task<ActionResult<AlumniJobPosition>> CreateAlumniPlacement(AlumniJobPosition alumniPlacement)
        {
            var created = await _alumniPlacementService.CreateAlumniPlacementAsync(alumniPlacement);
            return CreatedAtAction(nameof(GetAlumniPlacementById), new { id = created.id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlumniPlacement(int id, AlumniJobPosition updatedAlumniPlacement)
        {
            if (id != updatedAlumniPlacement.id)
                return BadRequest();

            var success = await _alumniPlacementService.UpdateAlumniPlacementAsync(id, updatedAlumniPlacement);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlumniPlacement(int id)
        {
            var success = await _alumniPlacementService.DeleteAlumniPlacementAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}

