using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyEmployeeController : Controller
    {
        private readonly AppDbContext _context;

        public CompanyEmployeeController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyEmployees()
        {
            var companyEmployees = await _context.companyemployee.ToListAsync();
            return Ok(companyEmployees);
        }

        [HttpPost]
        public async Task<IActionResult> PostCompanyEmployee(Companyemployee companyEmployee)
        {
            if (companyEmployee == null)
            {
                return BadRequest("Company employee data is null.");
            }
            _context.companyemployee.Add(companyEmployee);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompanyEmployees), new { id = companyEmployee.employeeid }, companyEmployee);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyEmployee(string id, Companyemployee updatedCompanyEmployee)
        {
            if (id != updatedCompanyEmployee.employeeid)
            {
                return BadRequest("ID mismatch.");
            }
            _context.Entry(updatedCompanyEmployee).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyEmployeeExists(id))
                {
                    return NotFound("Company employee not found.");
                }
                throw;
            }
            return NoContent();
        }

        private bool CompanyEmployeeExists(string id)
        {
            return _context.companyemployee.Any(e => e.employeeid == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanyEmployee(string id)
        {
            var companyEmployee = await _context.companyemployee.FindAsync(id);
            if (companyEmployee == null)
            {
                return NotFound("Company employee not found.");
            }
            _context.companyemployee.Remove(companyEmployee);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

