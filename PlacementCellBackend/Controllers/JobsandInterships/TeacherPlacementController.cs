using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Controllers.JobsandInterships
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
        public async Task<ActionResult<IEnumerable<TeacherResearchOpening>>> GetAllTeacherResearchOpenings()
        {
            var openings = await _teacherPlacementService.GetAllTeacherResearchOpeningsAsync();
            return Ok(openings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherResearchOpening>> GetTeacherResearchOpeningById(int id)
        {
            var opening = await _teacherPlacementService.GetTeacherResearchOpeningByIdAsync(id);
            if (opening == null)
                return NotFound();
            return Ok(opening);
        }

        [HttpPost]
        public async Task<ActionResult<TeacherResearchOpening>> CreateTeacherResearchOpening(TeacherResearchOpening researchOpening)
        {
            var created = await _teacherPlacementService.CreateTeacherResearchOpeningAsync(researchOpening);
            return CreatedAtAction(nameof(GetTeacherResearchOpeningById), new { created.id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacherResearchOpening(int id, TeacherResearchOpening updatedResearchOpening)
        {
            if (id != updatedResearchOpening.id)
                return BadRequest();

            var success = await _teacherPlacementService.UpdateTeacherResearchOpeningAsync(id, updatedResearchOpening);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherResearchOpening(int id)
        {
            var success = await _teacherPlacementService.DeleteTeacherResearchOpeningAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
