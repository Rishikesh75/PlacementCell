using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Services.CRUD
{
    public class CompanyService : ICompanyService
    {
        private readonly AppDbContext _context;

        public CompanyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Company>> GetAllCompaniesAsync()
        {
            return await _context.company.ToListAsync();
        }

        public async Task<Company?> GetCompanyByIdAsync(string id)
        {
            return await _context.company.FindAsync(id);
        }

        public async Task<Company> CreateCompanyAsync(Company company)
        {
            _context.company.Add(company);
            await _context.SaveChangesAsync();
            return company;
        }

        public async Task<bool> UpdateCompanyAsync(string id, Company company)
        {
            if (!CompanyExists(id))
                return false;

            _context.Entry(company).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCompanyAsync(string id)
        {
            var company = await _context.company.FindAsync(id);
            if (company == null)
                return false;

            _context.company.Remove(company);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool CompanyExists(string id)
        {
            return _context.company.Any(e => e.company_id == id);
        }
    }
}

