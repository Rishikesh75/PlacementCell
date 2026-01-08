using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Services.CRUD
{
    public class CompanyEmployeeService : ICompanyEmployeeService
    {
        private readonly AppDbContext _context;

        public CompanyEmployeeService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Companyemployee>> GetAllCompanyEmployeesAsync()
        {
            return await _context.companyemployee.ToListAsync();
        }

        public async Task<Companyemployee?> GetCompanyEmployeeByIdAsync(string id)
        {
            return await _context.companyemployee.FindAsync(id);
        }

        public async Task<Companyemployee> CreateCompanyEmployeeAsync(Companyemployee companyEmployee)
        {
            _context.companyemployee.Add(companyEmployee);
            await _context.SaveChangesAsync();
            return companyEmployee;
        }

        public async Task<bool> UpdateCompanyEmployeeAsync(string id, Companyemployee companyEmployee)
        {
            if (!CompanyEmployeeExists(id))
                return false;

            _context.Entry(companyEmployee).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCompanyEmployeeAsync(string id)
        {
            var companyEmployee = await _context.companyemployee.FindAsync(id);
            if (companyEmployee == null)
                return false;

            _context.companyemployee.Remove(companyEmployee);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool CompanyEmployeeExists(string id)
        {
            return _context.companyemployee.Any(e => e.employeeid == id);
        }
    }
}

