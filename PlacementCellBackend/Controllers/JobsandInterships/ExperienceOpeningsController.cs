using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs.AlumniJobOpenings;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Controllers.Alumni
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExperienceOpeningsController : ControllerBase
    {
        private readonly IAlumniPlacementService _alumniPlacementService;

        public ExperienceOpeningsController(IAlumniPlacementService alumniPlacementService)
        {
            _alumniPlacementService = alumniPlacementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlumniJobOpeningDto>>> GetAllAlumniJobPostion()
        {
            var placements = await _alumniPlacementService.GetAllAlumniJobPostionAsync();
            return Ok(placements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlumniJobOpeningDto>> GetAlumniPlacementById(int id)
        {
            var placement = await _alumniPlacementService.GetAlumniPlacementByIdAsync(id);
            if (placement == null)
                return NotFound();
            return Ok(placement);
        }

        [HttpPost]
        public async Task<bool> CreateAlumniPlacement(AlumniJobOpeningCreateDto alumniPlacement)
        {
            var created = await _alumniPlacementService.CreateAlumniPlacementAsync(alumniPlacement);
            return created;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAlumniPlacement(int id, AlumniJobOpeningCreateDto updatedAlumniPlacement)
        {

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

