using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherPlacementController : Controller
    {
        private readonly AppDbContext _context;
        public TeacherPlacementController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeacherPlacement>>> GetAllTeacherPlacements()
        {
            return Ok(await _context.teacherplacement.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherPlacement>> GetTeacherPlacementById(string id)
        {
            var teacherPlacement = await _context.teacherplacement.FindAsync(id);
            if (teacherPlacement == null)
                return NotFound();
            return Ok(teacherPlacement);
        }

        [HttpPost]
        public async Task<ActionResult<TeacherPlacement>> CreateTeacherPlacement(TeacherPlacement teacherPlacement)
        {
            _context.teacherplacement.Add(teacherPlacement);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeacherPlacementById), new { id = teacherPlacement.Id }, teacherPlacement);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTeacherPlacement(int id, TeacherPlacement updatedTeacherPlacement)
        {
            if (id != updatedTeacherPlacement.Id)
                return BadRequest();
            var existingTeacherPlacement = await _context.teacherplacement.FindAsync(id);
            if (existingTeacherPlacement == null)
                return NotFound();
            // Update fields
            existingTeacherPlacement.TeacherId = updatedTeacherPlacement.TeacherId;
            existingTeacherPlacement.CompanyId = updatedTeacherPlacement.CompanyId;
            existingTeacherPlacement.EmployeeEmail = updatedTeacherPlacement.EmployeeEmail;
            _context.Entry(existingTeacherPlacement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherPlacement(int id)
        {
            var teacherPlacement = await _context.teacherplacement.FindAsync(id);
            if (teacherPlacement == null)
                return NotFound();
            _context.teacherplacement.Remove(teacherPlacement);
            await _context.SaveChangesAsync();
            return NoContent();

        }
    }
}
