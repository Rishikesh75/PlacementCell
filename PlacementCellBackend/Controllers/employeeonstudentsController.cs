using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class employeeonstudentsController : Controller
    {
        private readonly AppDbContext _context;

        public employeeonstudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEmployeeOnStudents()
        {
            var employeeOnStudents = _context.employeeonstudent.ToList();
            return Ok(employeeOnStudents);
        }

        [HttpPost]
        public IActionResult PostEmployeeOnStudent(EmployeeonStudent employeeonStudent)
        {
            if (employeeonStudent == null)
            {
                return BadRequest("Invalid data.");
            }
            _context.employeeonstudent.Add(employeeonStudent);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEmployeeOnStudents), new { RecordId = employeeonStudent.RecordId }, employeeonStudent);

        }
    }
}
