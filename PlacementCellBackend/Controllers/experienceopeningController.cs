using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class experienceopeningController : Controller
    {
        private readonly AppDbContext _context;

        public experienceopeningController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetExperienceOpenings()
        {
            var openings = _context.experienceopening.ToList();
            return Ok(openings);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetExperienceOpeningById(int id)
        {
            var opening = _context.experienceopening.Find(id);
            if (opening == null)
            {
                return NotFound();
            }
            return Ok(opening);
        }
        [HttpPost] 
        public IActionResult CreateExperienceOpening(ExperienceOpening opening)
        {
            if (opening == null)
            {
                return BadRequest("Experience opening cannot be null.");
            }
            _context.experienceopening.Add(opening);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetExperienceOpeningById), new { id = opening.id }, opening);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult UpdateExperienceOpening(int id, ExperienceOpening updatedOpening)
        {
            if (updatedOpening == null || updatedOpening.id != id)
            {
                return BadRequest("Invalid experience opening data.");
            }
            var existingOpening = _context.experienceopening.Find(id);
            if (existingOpening == null)
            {
                return NotFound();
            }
            existingOpening.companyid = updatedOpening.companyid;
            existingOpening.jobid = updatedOpening.jobid;
            existingOpening.jobtitle = updatedOpening.jobtitle;
            existingOpening.experiencerequired = updatedOpening.experiencerequired;
            existingOpening.companyempemail = updatedOpening.companyempemail;
            _context.SaveChanges();
            return NoContent();
        }
    }
}
