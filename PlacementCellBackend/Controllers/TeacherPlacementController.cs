using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherPlacementController : ControllerBase
    {
        private readonly ITeacherPlacementService _teacherPlacementService;

        public TeacherPlacementController(ITeacherPlacementService teacherPlacementService)
        {
            _teacherPlacementService = teacherPlacementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherPlacements>>> GetAllTeacherPlacements()
        {
            var placements = await _teacherPlacementService.GetAllTeacherPlacementsAsync();
            return Ok(placements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherPlacements>> GetTeacherPlacementById(int id)
        {
            var placement = await _teacherPlacementService.GetTeacherPlacementByIdAsync(id);
            if (placement == null)
                return NotFound();
            return Ok(placement);
        }

        [HttpPost]
        public async Task<ActionResult<TeacherPlacements>> CreateTeacherPlacement(TeacherPlacements teacherPlacement)
        {
            var created = await _teacherPlacementService.CreateTeacherPlacementAsync(teacherPlacement);
            return CreatedAtAction(nameof(GetTeacherPlacementById), new { id = created.id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacherPlacement(int id, TeacherPlacements updatedTeacherPlacement)
        {
            if (id != updatedTeacherPlacement.id)
                return BadRequest();

            var success = await _teacherPlacementService.UpdateTeacherPlacementAsync(id, updatedTeacherPlacement);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherPlacement(int id)
        {
            var success = await _teacherPlacementService.DeleteTeacherPlacementAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
