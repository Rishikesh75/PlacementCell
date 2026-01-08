using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces
{
    public interface ITeacherService
    {
        Task<IEnumerable<Teacher>> GetAllTeachersAsync();
        Task<Teacher?> GetTeacherByIdAsync(string id);
        Task<Teacher> CreateTeacherAsync(Teacher teacher);
        Task<bool> UpdateTeacherAsync(string id, Teacher teacher);
        Task<bool> DeleteTeacherAsync(string id);
        bool TeacherExists(string id);
    }
}

