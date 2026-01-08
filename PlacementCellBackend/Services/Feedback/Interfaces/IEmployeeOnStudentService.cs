using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Feedback.Interfaces
{
    public interface IEmployeeOnStudentService
    {
        Task<IEnumerable<EmployeeFeedbackonStudent>> GetAllEmployeeOnStudentsAsync();
        Task<EmployeeFeedbackonStudent?> GetEmployeeOnStudentByIdAsync(int id);
        Task<EmployeeFeedbackonStudent> CreateEmployeeOnStudentAsync(EmployeeFeedbackonStudent employeeOnStudent);
        Task<bool> UpdateEmployeeOnStudentAsync(int id, EmployeeFeedbackonStudent employeeOnStudent);
        Task<bool> DeleteEmployeeOnStudentAsync(int id);
    }
}

