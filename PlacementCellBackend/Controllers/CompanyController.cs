using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : Controller
    {
        private readonly AppDbContext _context;

        public CompanyController(AppDbContext context)
        {
            _context = context;
        }


        // GET: api/company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompany()
        {
            return await _context.company.ToListAsync();
        }

        // GET: api/company/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetComapany(string id)
        {
            var company = await _context.company.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        [HttpPost]
        public async Task<ActionResult<Teacher>> PostComapny(Company company)
        {
            _context.company.Add(company);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCompany), new { id = company.company_id }, company);
        }

        // PUT: api/teachers/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(string id, Company updatedCompany)
        {
            if (id != updatedCompany.company_id)
            {
                return BadRequest();
            }

            _context.Entry(updatedCompany).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(string id)
        {
            var company = await _context.company.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.company.Remove(company);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool CompanyExists(string id)
        {
            return _context.company.Any(e => e.company_id == id);
        }
    }
}
