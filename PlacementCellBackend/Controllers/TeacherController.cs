using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeachersController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teacher>>> GetTeachers()
        {
            var teachers = await _teacherService.GetAllTeachersAsync();
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Teacher>> GetTeacher(string id)
        {
            var teacher = await _teacherService.GetTeacherByIdAsync(id);
            if (teacher == null)
                return NotFound();
            return Ok(teacher);
        }

        [HttpPost]
        public async Task<ActionResult<Teacher>> PostTeacher(Teacher teacher)
        {
            var created = await _teacherService.CreateTeacherAsync(teacher);
            return CreatedAtAction(nameof(GetTeacher), new { id = created.teacher_id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeacher(string id, Teacher updatedTeacher)
        {
            if (id != updatedTeacher.teacher_id)
                return BadRequest();

            var success = await _teacherService.UpdateTeacherAsync(id, updatedTeacher);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(string id)
        {
            var success = await _teacherService.DeleteTeacherAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
