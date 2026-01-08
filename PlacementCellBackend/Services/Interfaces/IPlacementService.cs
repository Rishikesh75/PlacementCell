using PlacementCellBackend.Models;

namespace PlacementCellBackend.Services.Interfaces
{
    public interface IPlacementService
    {
        Task<IEnumerable<Placement>> GetAllPlacementsAsync();
        Task<Placement?> GetPlacementByIdAsync(int id);
        Task<Placement> CreatePlacementAsync(Placement placement);
        Task<bool> UpdatePlacementAsync(int id, Placement placement);
        Task<bool> DeletePlacementAsync(int id);
    }
}

