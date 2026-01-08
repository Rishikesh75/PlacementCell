using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeOnStudentsController : ControllerBase
    {
        private readonly IEmployeeOnStudentService _employeeOnStudentService;

        public EmployeeOnStudentsController(IEmployeeOnStudentService employeeOnStudentService)
        {
            _employeeOnStudentService = employeeOnStudentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeFeedbackonStudent>>> GetEmployeeOnStudents()
        {
            var employees = await _employeeOnStudentService.GetAllEmployeeOnStudentsAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeFeedbackonStudent>> GetEmployeeOnStudent(int id)
        {
            var employee = await _employeeOnStudentService.GetEmployeeOnStudentByIdAsync(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeFeedbackonStudent>> PostEmployeeOnStudent(EmployeeFeedbackonStudent employeeOnStudent)
        {
            if (employeeOnStudent == null)
                return BadRequest("Invalid data.");

            var created = await _employeeOnStudentService.CreateEmployeeOnStudentAsync(employeeOnStudent);
            return CreatedAtAction(nameof(GetEmployeeOnStudent), new { id = created.RecordId }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeOnStudent(int id, EmployeeFeedbackonStudent updatedEmployeeOnStudent)
        {
            if (id != updatedEmployeeOnStudent.RecordId)
                return BadRequest();

            var success = await _employeeOnStudentService.UpdateEmployeeOnStudentAsync(id, updatedEmployeeOnStudent);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeOnStudent(int id)
        {
            var success = await _employeeOnStudentService.DeleteEmployeeOnStudentAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
