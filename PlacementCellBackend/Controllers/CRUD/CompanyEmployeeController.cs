using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs.CompanyEmployee;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers.CRUD
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
        public async Task<ActionResult<IEnumerable<CompanyEmployeeDto>>> GetCompanyEmployees()
        {
            var employees = await _companyEmployeeService.GetAllCompanyEmployeesAsync();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyEmployeeDto>> GetCompanyEmployee(string id)
        {
            var employee = await _companyEmployeeService.GetCompanyEmployeeByIdAsync(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<bool> PostCompanyEmployee(CompanyEmployeeCreateDto companyEmployee)
        {

            var created = await _companyEmployeeService.CreateCompanyEmployeeAsync(companyEmployee);
            return created;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyEmployee(string id, CompanyEmployeeCreateDto updatedCompanyEmployee)
        {


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
