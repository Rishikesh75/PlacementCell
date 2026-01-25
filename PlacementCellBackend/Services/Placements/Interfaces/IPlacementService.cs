using PlacementCellBackend.DTOs.PlacementDTOs;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface IPlacementService
    {
        Task<IEnumerable<PlacementDTO>> GetAllPlacementsAsync();
        Task<PlacementDTO?> GetPlacementByIdAsync(int id);
        Task<PlacementDTO> CreatePlacementAsync(CreatePlacementDTO placement);
        Task<bool> UpdatePlacementAsync(int id, CreatePlacementDTO placement);
        Task<bool> DeletePlacementAsync(int id);
    }
}

