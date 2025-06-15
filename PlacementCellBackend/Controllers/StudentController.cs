using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return Ok(await _context.student.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudentById(string id)
        {
            var student = await _context.student.FindAsync(id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }

        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent(Student student)
        {
            _context.student.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStudentById), new { id = student.studentid }, student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(long id, Student student)
        {
            if (id != student.studentid)
                return BadRequest();

            var existingStudent = await _context.student.FindAsync(id);
            if (existingStudent == null)
                return NotFound();

            // Update fields
            existingStudent.name = student.name;
            existingStudent.major = student.major;
            existingStudent.email = student.email;
            existingStudent.graduationyear = student.graduationyear;
            existingStudent.phoneno = student.phoneno;

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

