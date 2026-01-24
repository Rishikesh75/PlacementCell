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
            var companyIds = employees.Select(e => e.companyid).Distinct().ToList();

            // Step 3: Query Company table to get company names
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.company_id))
                .ToDictionaryAsync(c => c.company_id, c => c.company_name);
            return employees.Select(e => new CompanyEmployeeDto
            {
                name = e.name,
                designation = e.designation,
                email = e.email,
                profileurl = e.profileurl,
                companyname = companies.TryGetValue(e.companyid, out var name) ? name : "Unknown"
            });
        }

        public async Task<CompanyEmployeeDto?> GetCompanyEmployeeByIdAsync(string id)
        {
            var employee = await _context.companyemployee.FindAsync(id);
            if (employee == null)
                return null;
            var companyId = employee?.companyid;
            var company = await _context.company
                .FirstOrDefaultAsync(c => c.company_id == companyId);
            return new CompanyEmployeeDto
            {
                name = employee.name,
                designation = employee.designation,
                email = employee.email,
                profileurl = employee.profileurl,
                companyname = company?.company_name ?? "Unknown"
            };

        }

        public async Task<bool> CreateCompanyEmployeeAsync(CompanyEmployeeCreateDto companyEmployee)
        {
            var companyEmployeeModel = new Companyemployee
            {
                employeeid = companyEmployee.id,
                name = companyEmployee.name,
                designation = companyEmployee.designation,
                email = companyEmployee.email,
                companyid = companyEmployee.companyid,
                profileurl = companyEmployee.profileurl
            };

            _context.companyemployee.Add(companyEmployeeModel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCompanyEmployeeAsync(string id, CompanyEmployeeCreateDto companyEmployee)
        {
            if (!CompanyEmployeeExists(id))
                return false;

            var existingEmployee = await _context.companyemployee.FindAsync(id);
            if (existingEmployee == null)
                return false;

            existingEmployee.name = companyEmployee.name;
            existingEmployee.designation = companyEmployee.designation;
            existingEmployee.email = companyEmployee.email;
            existingEmployee.companyid = companyEmployee.companyid;
            existingEmployee.profileurl = companyEmployee.profileurl;
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

