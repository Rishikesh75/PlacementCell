using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs.EmployeeFeedbackonStudent;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Controllers.FeedBack
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
        public async Task<ActionResult<IEnumerable<EmployeeFeedbackonStudentDtos>>> GetEmployeeOnStudents()
        {
            var employees = await _employeeOnStudentService.GetAllEmployeeOnStudentsAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeFeedbackonStudentDtos>> GetEmployeeOnStudent(int id)
        {
            var employee = await _employeeOnStudentService.GetEmployeeOnStudentByIdAsync(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> PostEmployeeOnStudent(EmployeeFeedbackonStudentCreateDtos employeeOnStudent)
        {
            if (employeeOnStudent == null)
                return BadRequest("Invalid data.");

            var created = await _employeeOnStudentService.CreateEmployeeOnStudentAsync(employeeOnStudent);
            return created;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeOnStudent(int id, EmployeeFeedbackonStudentCreateDtos updatedEmployeeOnStudent)
        {


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
