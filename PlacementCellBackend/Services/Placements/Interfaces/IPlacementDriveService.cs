using PlacementCellBackend.DTOs.PlacementDriveDTOs;

namespace PlacementCellBackend.Services.Placements.Interfaces
{
    public interface IPlacementDriveService
    {
        Task<IEnumerable<PlacementDriveDTO>> GetAllPlacementDrivesAsync();
        Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByCollegeAsync(int collegeId);
        Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByCompanyAsync(string companyId);
        Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByDateAsync(DateOnly date);
        Task<IEnumerable<PlacementDriveDTO>> GetUpcomingPlacementDrivesAsync();
        Task<PlacementDriveDTO?> GetPlacementDriveByIdAsync(int driveId);
        Task<PlacementDriveDTO> SchedulePlacementDriveAsync(CreatePlacementDriveDTO driveDto);
        Task<bool> UpdatePlacementDriveAsync(int driveId, UpdatePlacementDriveDTO driveDto);
        Task<bool> UpdateDriveStatusAsync(int driveId, string status);
        Task<bool> CancelPlacementDriveAsync(int driveId);
        Task<bool> DeletePlacementDriveAsync(int driveId);
    }
}
