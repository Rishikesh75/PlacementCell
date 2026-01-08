using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyEmployeeController : ControllerBase
    {
        private readonly ICompanyEmployeeService _companyEmployeeService;

        public CompanyEmployeeController(ICompanyEmployeeService companyEmployeeService)
        {
            _companyEmployeeService = companyEmployeeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Companyemployee>>> GetCompanyEmployees()
        {
            var employees = await _companyEmployeeService.GetAllCompanyEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Companyemployee>> GetCompanyEmployee(string id)
        {
            var employee = await _companyEmployeeService.GetCompanyEmployeeByIdAsync(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<ActionResult<Companyemployee>> PostCompanyEmployee(Companyemployee companyEmployee)
        {
            if (companyEmployee == null)
                return BadRequest("Company employee data is null.");

            var created = await _companyEmployeeService.CreateCompanyEmployeeAsync(companyEmployee);
            return CreatedAtAction(nameof(GetCompanyEmployee), new { id = created.employeeid }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyEmployee(string id, Companyemployee updatedCompanyEmployee)
        {
            if (id != updatedCompanyEmployee.employeeid)
                return BadRequest("ID mismatch.");

            var success = await _companyEmployeeService.UpdateCompanyEmployeeAsync(id, updatedCompanyEmployee);
            if (!success)
                return NotFound("Company employee not found.");

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanyEmployee(string id)
        {
            var success = await _companyEmployeeService.DeleteCompanyEmployeeAsync(id);
            if (!success)
                return NotFound("Company employee not found.");

            return NoContent();
        }
    }
}
