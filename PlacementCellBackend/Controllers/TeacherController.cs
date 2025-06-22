using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeachersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/teachers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            return await _context.teacher.ToListAsync();
        }

        // GET: api/teachers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(string id)
        {
            var teacher = await _context.teacher.FindAsync(id);

            if (teacher == null)
            {
                return NotFound();
            }

            return teacher;
        }

        // POST: api/teachers
        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
        {
            _context.teacher.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTeacher), new { id = teacher.teacher_id }, teacher);
        }

        // PUT: api/teachers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(string id, Teacher updatedTeacher)
        {
            if (id != updatedTeacher.teacher_id)
            {
                return BadRequest();
            }

            _context.Entry(updatedTeacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/teachers/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(string id)
        {
            var teacher = await _context.teacher.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.teacher.Remove(teacher);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeacherExists(string id)
        {
            return _context.teacher.Any(e => e.teacher_id == id);
        }
    }
}
