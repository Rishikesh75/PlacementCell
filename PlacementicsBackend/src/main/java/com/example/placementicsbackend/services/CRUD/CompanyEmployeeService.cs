using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.CompanyEmployee;
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

        public async Task<IEnumerable<CompanyEmployeeDto>> GetAllCompanyEmployeesAsync()
        {
            var employees = await _context.companyemployee.ToListAsync();

            // Step 2: Get distinct company IDs
            var CompanyIds = employees.Select(e => e.CompanyId).Distinct().ToList();

            // Step 3: Query Company table to get company names
            var companies = await _context.company
                .Where(c => CompanyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);
            return employees.Select(e => new CompanyEmployeeDto
            {
                name = e.Name,
                Designation = e.Designation,
                Email = e.Email,
                ProfileUrl = e.ProfileUrl,
                companyname = companies.TryGetValue(e.CompanyId, out var name) ? name : "Unknown"
            });
        }

        public async Task<CompanyEmployeeDto?> GetCompanyEmployeeByIdAsync(string id)
        {
            var employee = await _context.companyemployee.FindAsync(id);
            if (employee == null)
                return null;
            var CompanyId = employee?.CompanyId;
            var company = await _context.company
                .FirstOrDefaultAsync(c => c.CompanyId == CompanyId);
            return new CompanyEmployeeDto
            {
                name = employee.Name,
                Designation = employee.Designation,
                Email = employee.Email,
                ProfileUrl = employee.ProfileUrl,
                companyname = company?.CompanyName ?? "Unknown"
            };

        }

        public async Task<bool> CreateCompanyEmployeeAsync(CompanyEmployeeCreateDto companyEmployee)
        {
            var companyEmployeeModel = new Companyemployee
            {
                EmployeeId = companyEmployee.id,
                Name = companyEmployee.name,
                Designation = companyEmployee.Designation,
                Email = companyEmployee.Email,
                CompanyId = companyEmployee.CompanyId,
                ProfileUrl = companyEmployee.ProfileUrl
            };

            _context.companyemployee.Add(companyEmployeeModel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpDateCompanyEmployeeAsync(string id, CompanyEmployeeCreateDto companyEmployee)
        {
            if (!CompanyEmployeeExists(id))
                return false;

            var existingEmployee = await _context.companyemployee.FindAsync(id);
            if (existingEmployee == null)
                return false;

            existingEmployee.Name = companyEmployee.name;
            existingEmployee.Designation = companyEmployee.Designation;
            existingEmployee.Email = companyEmployee.Email;
            existingEmployee.CompanyId = companyEmployee.CompanyId;
            existingEmployee.ProfileUrl = companyEmployee.ProfileUrl;
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
            return _context.companyemployee.Any(e => e.EmployeeId == id);
        }
    }
}

