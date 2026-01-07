using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackOnCompanyController : ControllerBase
    {
        private readonly IFeedbackOnCompanyService _feedbackService;

        public FeedbackOnCompanyController(IFeedbackOnCompanyService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedBackOnCompany>>> GetFeedbackOnCompany()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FeedBackOnCompany>> GetFeedback(string id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return NotFound();
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<ActionResult<FeedBackOnCompany>> PostFeedbackOnCompany(FeedBackOnCompany feedback)
        {
            var created = await _feedbackService.CreateFeedbackAsync(feedback);
            return CreatedAtAction(nameof(GetFeedback), new { id = created.feedbackid }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedback(string id, FeedBackOnCompany updatedFeedback)
        {
            if (id != updatedFeedback.feedbackid)
                return BadRequest();

            var success = await _feedbackService.UpdateFeedbackAsync(id, updatedFeedback);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(string id)
        {
            var success = await _feedbackService.DeleteFeedbackAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
