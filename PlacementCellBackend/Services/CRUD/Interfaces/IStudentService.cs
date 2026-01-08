using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<Student>> GetAllStudentsAsync();
        Task<Student?> GetStudentByIdAsync(string id);
        Task<Student> CreateStudentAsync(Student student);
        Task<bool> UpdateStudentAsync(string id, Student student);
        Task<bool> DeleteStudentAsync(string id);
    }
}

