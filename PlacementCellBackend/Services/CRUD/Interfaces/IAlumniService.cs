using PlacementCellBackend.DTOs.AlumniDtos;
using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.CRUD.Interfaces;

public interface IAlumniService
{
    Task<IEnumerable<AlumniDto>> GetAllAlumniAsync();
    Task<AlumniDto?> GetAlumniByIdWithCompanyAsync(string id);
    Task<Alumni?> GetAlumniByIdAsync(string id);
    Task<Alumni> CreateAlumniAsync(Alumni alumni);
    Task<bool> UpdateAlumniAsync(string id, AlumniDtoUpdate alumni);
    Task<bool> DeleteAlumniAsync(string id);
    bool AlumniExists(string id);
}
