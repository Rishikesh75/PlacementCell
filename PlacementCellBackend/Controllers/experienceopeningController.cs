using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExperienceOpeningController : ControllerBase
    {
        private readonly IExperienceOpeningService _experienceOpeningService;

        public ExperienceOpeningController(IExperienceOpeningService experienceOpeningService)
        {
            _experienceOpeningService = experienceOpeningService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExperienceOpening>>> GetExperienceOpenings()
        {
            var openings = await _experienceOpeningService.GetAllExperienceOpeningsAsync();
            return Ok(openings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExperienceOpening>> GetExperienceOpeningById(int id)
        {
            var opening = await _experienceOpeningService.GetExperienceOpeningByIdAsync(id);
            if (opening == null)
                return NotFound();
            return Ok(opening);
        }

        [HttpPost]
        public async Task<ActionResult<ExperienceOpening>> CreateExperienceOpening(ExperienceOpening opening)
        {
            if (opening == null)
                return BadRequest("Experience opening cannot be null.");

            var created = await _experienceOpeningService.CreateExperienceOpeningAsync(opening);
            return CreatedAtAction(nameof(GetExperienceOpeningById), new { id = created.id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExperienceOpening(int id, ExperienceOpening updatedOpening)
        {
            if (updatedOpening == null || updatedOpening.id != id)
                return BadRequest("Invalid experience opening data.");

            var success = await _experienceOpeningService.UpdateExperienceOpeningAsync(id, updatedOpening);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperienceOpening(int id)
        {
            var success = await _experienceOpeningService.DeleteExperienceOpeningAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
