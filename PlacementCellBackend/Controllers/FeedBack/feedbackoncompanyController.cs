using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Controllers.FeedBack
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
        public async Task<ActionResult<IEnumerable<AlumniFeedBackOnCompanyDTO>>> GetFeedbackOnCompany()
        {
            var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
            return Ok(feedbacks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlumniFeedBackOnCompanyDTO>> GetFeedback(string id)
        {
            var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
            if (feedback == null)
                return NotFound();
            return Ok(feedback);
        }

        [HttpPost]
        public async Task<ActionResult<AlumniFeedBackOnCompanyCreateDTO>> PostFeedbackOnCompany(AlumniFeedBackOnCompanyCreateDTO feedback)
        {
            var created = await _feedbackService.CreateFeedbackAsync(feedback);
            return CreatedAtAction(nameof(GetFeedback), new { }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutFeedback(int id, AlumniFeedBackOnCompanyCreateDTO updatedFeedback)
        {


            var success = await _feedbackService.UpdateFeedbackAsync(id, updatedFeedback);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var success = await _feedbackService.DeleteFeedbackAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
