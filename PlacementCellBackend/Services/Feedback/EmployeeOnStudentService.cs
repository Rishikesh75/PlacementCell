using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Services.Feedback
{
    public class EmployeeOnStudentService : IEmployeeOnStudentService
    {
        private readonly AppDbContext _context;

        public EmployeeOnStudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EmployeeFeedbackonStudent>> GetAllEmployeeOnStudentsAsync()
        {
            return await _context.employeefeedbackonstudent.ToListAsync();
        }

        public async Task<EmployeeFeedbackonStudent?> GetEmployeeOnStudentByIdAsync(int id)
        {
            return await _context.employeefeedbackonstudent.FindAsync(id);
        }

        public async Task<EmployeeFeedbackonStudent> CreateEmployeeOnStudentAsync(EmployeeFeedbackonStudent employeeOnStudent)
        {
            _context.employeefeedbackonstudent.Add(employeeOnStudent);
            await _context.SaveChangesAsync();
            return employeeOnStudent;
        }

        public async Task<bool> UpdateEmployeeOnStudentAsync(int id, EmployeeFeedbackonStudent employeeOnStudent)
        {
            var existing = await _context.employeefeedbackonstudent.FindAsync(id);
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
            var employeeOnStudent = await _context.employeefeedbackonstudent.FindAsync(id);
            if (employeeOnStudent == null)
                return false;

            _context.employeefeedbackonstudent.Remove(employeeOnStudent);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

