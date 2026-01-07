using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Interfaces;

namespace PlacementCellBackend.Services
{
    public class EmployeeOnStudentService : IEmployeeOnStudentService
    {
        private readonly AppDbContext _context;

        public EmployeeOnStudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeonStudent>> GetAllEmployeeOnStudentsAsync()
        {
            return await _context.employeeonstudent.ToListAsync();
        }

        public async Task<EmployeeonStudent?> GetEmployeeOnStudentByIdAsync(int id)
        {
            return await _context.employeeonstudent.FindAsync(id);
        }

        public async Task<EmployeeonStudent> CreateEmployeeOnStudentAsync(EmployeeonStudent employeeOnStudent)
        {
            _context.employeeonstudent.Add(employeeOnStudent);
            await _context.SaveChangesAsync();
            return employeeOnStudent;
        }

        public async Task<bool> UpdateEmployeeOnStudentAsync(int id, EmployeeonStudent employeeOnStudent)
        {
            var existing = await _context.employeeonstudent.FindAsync(id);
            if (existing == null)
                return false;

            existing.CompnayEmpId = employeeOnStudent.CompnayEmpId;
            existing.BatchId = employeeOnStudent.BatchId;
            existing.Description = employeeOnStudent.Description;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEmployeeOnStudentAsync(int id)
        {
            var employeeOnStudent = await _context.employeeonstudent.FindAsync(id);
            if (employeeOnStudent == null)
                return false;

            _context.employeeonstudent.Remove(employeeOnStudent);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

