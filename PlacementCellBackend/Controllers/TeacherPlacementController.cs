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
        public async Task<ActionResult<IEnumerable<TeacherPlacements>>> GetAllTeacherPlacements()
        {
            return Ok(await _context.teacherplacements.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeacherPlacements>> GetTeacherPlacementById(string id)
        {
            var teacherPlacement = await _context.teacherplacements.FindAsync(id);
            if (teacherPlacement == null)
                return NotFound();
            return Ok(teacherPlacement);
        }

        [HttpPost]
        public async Task<ActionResult<TeacherPlacements>> CreateTeacherPlacement(TeacherPlacements teacherPlacement)
        {
            _context.teacherplacements.Add(teacherPlacement);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTeacherPlacementById), new { id = teacherPlacement.id }, teacherPlacement);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTeacherPlacement(int id, TeacherPlacements updatedTeacherPlacement)
        {
            if (id != updatedTeacherPlacement.id)
                return BadRequest();
            var existingTeacherPlacement = await _context.teacherplacements.FindAsync(id);
            if (existingTeacherPlacement == null)
                return NotFound();
            // Update fields
            existingTeacherPlacement.teacherid = updatedTeacherPlacement.teacherid;
            existingTeacherPlacement.companyid = updatedTeacherPlacement.companyid;
            existingTeacherPlacement.employeeemail = updatedTeacherPlacement.employeeemail;
            _context.Entry(existingTeacherPlacement).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacherPlacement(int id)
        {
            var teacherPlacement = await _context.teacherplacements.FindAsync(id);
            if (teacherPlacement == null)
                return NotFound();
            _context.teacherplacements.Remove(teacherPlacement);
            await _context.SaveChangesAsync();
            return NoContent();

        }
    }
}
