using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompany()
        {
            var companies = await _companyService.GetAllCompaniesAsync();
            return Ok(companies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(string id)
        {
            var company = await _companyService.GetCompanyByIdAsync(id);
            if (company == null)
                return NotFound();
            return Ok(company);
        }

        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
            var created = await _companyService.CreateCompanyAsync(company);
            return CreatedAtAction(nameof(GetCompany), new { id = created.company_id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(string id, Company updatedCompany)
        {
            if (id != updatedCompany.company_id)
                return BadRequest();

            var success = await _companyService.UpdateCompanyAsync(id, updatedCompany);
            if (!success)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(string id)
        {
            var success = await _companyService.DeleteCompanyAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
