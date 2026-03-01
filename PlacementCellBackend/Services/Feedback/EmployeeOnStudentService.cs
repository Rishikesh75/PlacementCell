using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.EmployeeFeedbackonStudent;
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

        public async Task<IEnumerable<EmployeeFeedbackonStudentDtos>> GetAllEmployeeOnStudentsAsync()
        {
            // Step 1: Query EmployeeFeedbackonStudent table
            var feedbacks = await _context.employeefeedbackonstudent.ToListAsync();

            // Step 2: Get distinct employee IDs
            var EmployeeIds = feedbacks.Select(f => f.CompanyEmpId).Distinct().ToList();

            // Step 3: Query CompanyEmployee table to get employee names and their company IDs
            var employees = await _context.companyemployee
                .Where(e => EmployeeIds.Contains(e.EmployeeId))
                .ToDictionaryAsync(e => e.EmployeeId, e => new { e.Name, e.CompanyId });

            // Step 4: Get distinct company IDs from employees
            var CompanyIds = employees.Values.Select(e => e.CompanyId).Distinct().ToList();

            // Step 5: Query Company table to get company names
            var companies = await _context.company
                .Where(c => CompanyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            // Step 6: Map to DTO
            return feedbacks.Select(f =>
            {
                var employee = employees.TryGetValue(f.CompanyEmpId, out var emp) ? emp : null;
                var companyName = employee != null && companies.TryGetValue(employee.CompanyId, out var name)
                    ? name
                    : "Unknown";

                return new EmployeeFeedbackonStudentDtos
                {
                    Id = f.Id,
                    employeeName = employee?.Name ?? "Unknown",
                    compnayName = companyName,
                    batchId = f.BatchId,
                    Description = f.Description
                };
            });
        }

        public async Task<EmployeeFeedbackonStudentDtos?> GetEmployeeOnStudentByIdAsync(int id)
        {
            // Step 1: Find the feedback by ID
            var feedback = await _context.employeefeedbackonstudent.FindAsync(id);
            if (feedback == null)
                return null;

            // Step 2: Get the employee
            var employee = await _context.companyemployee
                .FirstOrDefaultAsync(e => e.EmployeeId == feedback.CompanyEmpId);

            // Step 3: Get the company name
            string companyName = "Unknown";
            if (employee != null)
            {
                var company = await _context.company
                    .FirstOrDefaultAsync(c => c.CompanyId == employee.CompanyId);
                companyName = company?.CompanyName ?? "Unknown";
            }

            // Step 4: Map to DTO
            return new EmployeeFeedbackonStudentDtos
            {
                Id = feedback.Id,
                employeeName = employee?.Name ?? "Unknown",
                compnayName = companyName,
                batchId = feedback.BatchId,
                Description = feedback.Description
            };
        }

        public async Task<bool> CreateEmployeeOnStudentAsync(EmployeeFeedbackonStudentCreateDtos employeeOnStudent)
        {
            var employeeOnStudentModel = new EmployeeFeedbackonStudent
            {
                CompanyEmpId = employeeOnStudent.CompanyEmpId,
                BatchId = employeeOnStudent.batchId,
                Description = employeeOnStudent.Description
            };

            _context.employeefeedbackonstudent.Add(employeeOnStudentModel);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpDateEmployeeOnStudentAsync(int id, EmployeeFeedbackonStudentCreateDtos employeeOnStudent)
        {
            var existing = await _context.employeefeedbackonstudent.FindAsync(id);
            if (existing == null)
                return false;

            existing.CompanyEmpId = employeeOnStudent.CompanyEmpId;
            existing.BatchId = employeeOnStudent.batchId;
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

