using PlacementCellBackend.DTOs.EmployeeFeedbackonStudent;

namespace PlacementCellBackend.Services.Feedback.Interfaces
{
    public interface IEmployeeOnStudentService
    {
        Task<IEnumerable<EmployeeFeedbackonStudentDtos>> GetAllEmployeeOnStudentsAsync();
        Task<EmployeeFeedbackonStudentDtos?> GetEmployeeOnStudentByIdAsync(int id);
        Task<bool> CreateEmployeeOnStudentAsync(EmployeeFeedbackonStudentCreateDtos employeeOnStudent);
        Task<bool> UpdateEmployeeOnStudentAsync(int id, EmployeeFeedbackonStudentCreateDtos employeeOnStudent);
        Task<bool> DeleteEmployeeOnStudentAsync(int id);
    }
}

