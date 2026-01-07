using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IEmployeeOnStudentService
    {
        Task<IEnumerable<EmployeeonStudent>> GetAllEmployeeOnStudentsAsync();
        Task<EmployeeonStudent?> GetEmployeeOnStudentByIdAsync(int id);
        Task<EmployeeonStudent> CreateEmployeeOnStudentAsync(EmployeeonStudent employeeOnStudent);
        Task<bool> UpdateEmployeeOnStudentAsync(int id, EmployeeonStudent employeeOnStudent);
        Task<bool> DeleteEmployeeOnStudentAsync(int id);
    }
}

