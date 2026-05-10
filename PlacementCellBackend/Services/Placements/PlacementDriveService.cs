using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs.PlacementDriveDTOs;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.Placements.Interfaces;

namespace PlacementCellBackend.Services.Placements
{
    public class PlacementDriveService : IPlacementDriveService
    {
        private readonly AppDbContext _context;

        public PlacementDriveService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PlacementDriveDTO>> GetAllPlacementDrivesAsync()
        {
            var drives = await _context.placementdrive.ToListAsync();

            if (!drives.Any())
            {
                return Enumerable.Empty<PlacementDriveDTO>();
            }

            // Get unique company IDs and fetch company names
            var companyIds = drives.Select(d => d.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            return drives.Select(d => MapToDTO(d, companies)).ToList();
        }

        public async Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByCollegeAsync(int collegeId)
        {
            var drives = await _context.placementdrive
                .Where(d => d.CollegeId == collegeId)
                .ToListAsync();

            if (!drives.Any())
            {
                return Enumerable.Empty<PlacementDriveDTO>();
            }

            var companyIds = drives.Select(d => d.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            return drives.Select(d => MapToDTO(d, companies)).ToList();
        }

        public async Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByCompanyAsync(string companyId)
        {
            var drives = await _context.placementdrive
                .Where(d => d.CompanyId == companyId)
                .ToListAsync();

            if (!drives.Any())
            {
                return Enumerable.Empty<PlacementDriveDTO>();
            }

            var companyName = await _context.company
                .Where(c => c.CompanyId == companyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            var companies = new Dictionary<string, string> { { companyId, companyName } };

            return drives.Select(d => MapToDTO(d, companies)).ToList();
        }

        public async Task<IEnumerable<PlacementDriveDTO>> GetPlacementDrivesByDateAsync(DateOnly date)
        {
            var drives = await _context.placementdrive
                .Where(d => d.DriveDate == date)
                .ToListAsync();

            if (!drives.Any())
            {
                return Enumerable.Empty<PlacementDriveDTO>();
            }

            var companyIds = drives.Select(d => d.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            return drives.Select(d => MapToDTO(d, companies)).ToList();
        }

        public async Task<IEnumerable<PlacementDriveDTO>> GetUpcomingPlacementDrivesAsync()
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            var drives = await _context.placementdrive
                .Where(d => d.DriveDate >= today && d.IsActive && d.Status != "Cancelled" && d.Status != "Completed")
                .OrderBy(d => d.DriveDate)
                .ToListAsync();

            if (!drives.Any())
            {
                return Enumerable.Empty<PlacementDriveDTO>();
            }

            var companyIds = drives.Select(d => d.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            return drives.Select(d => MapToDTO(d, companies)).ToList();
        }

        public async Task<PlacementDriveDTO?> GetPlacementDriveByIdAsync(int driveId)
        {
            var drive = await _context.placementdrive.FindAsync(driveId);

            if (drive == null)
            {
                return null;
            }

            var companyName = await _context.company
                .Where(c => c.CompanyId == drive.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new PlacementDriveDTO
            {
                DriveId = drive.DriveId,
                CollegeId = drive.CollegeId,
                CompanyId = drive.CompanyId,
                CompanyName = companyName,
                DriveTitle = drive.DriveTitle,
                Description = drive.Description,
                DriveDate = drive.DriveDate,
                RegistrationDeadline = drive.RegistrationDeadline,
                EligibilityCriteria = drive.EligibilityCriteria,
                Package = drive.Package,
                JobRoles = drive.JobRoles,
                Location = drive.Location,
                MaxRegistrations = drive.MaxRegistrations,
                CurrentRegistrations = drive.CurrentRegistrations,
                Status = drive.Status,
                IsActive = drive.IsActive,
                CreatedAt = drive.CreatedAt
            };
        }

        public async Task<PlacementDriveDTO> SchedulePlacementDriveAsync(CreatePlacementDriveDTO driveDto)
        {
            // Map DTO to Model
            var drive = new PlacementDrive
            {
                CollegeId = driveDto.CollegeId,
                CompanyId = driveDto.CompanyId,
                DriveTitle = driveDto.DriveTitle,
                Description = driveDto.Description,
                DriveDate = driveDto.DriveDate,
                RegistrationDeadline = driveDto.RegistrationDeadline,
                EligibilityCriteria = driveDto.EligibilityCriteria,
                Package = driveDto.Package,
                JobRoles = driveDto.JobRoles,
                Location = driveDto.Location,
                MaxRegistrations = driveDto.MaxRegistrations,
                IsActive = driveDto.IsActive,
                Status = "Scheduled",
                CreatedAt = DateTime.UtcNow,
                CurrentRegistrations = 0
            };

            _context.placementdrive.Add(drive);
            await _context.SaveChangesAsync();

            // Get company name for response
            var companyName = await _context.company
                .Where(c => c.CompanyId == drive.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            return new PlacementDriveDTO
            {
                DriveId = drive.DriveId,
                CollegeId = drive.CollegeId,
                CompanyId = drive.CompanyId,
                CompanyName = companyName,
                DriveTitle = drive.DriveTitle,
                Description = drive.Description,
                DriveDate = drive.DriveDate,
                RegistrationDeadline = drive.RegistrationDeadline,
                EligibilityCriteria = drive.EligibilityCriteria,
                Package = drive.Package,
                JobRoles = drive.JobRoles,
                Location = drive.Location,
                MaxRegistrations = drive.MaxRegistrations,
                CurrentRegistrations = drive.CurrentRegistrations,
                Status = drive.Status,
                IsActive = drive.IsActive,
                CreatedAt = drive.CreatedAt
            };
        }

        public async Task<bool> UpdatePlacementDriveAsync(int driveId, UpdatePlacementDriveDTO driveDto)
        {
            var existing = await _context.placementdrive.FindAsync(driveId);
            if (existing == null)
                return false;

            // Update properties from DTO
            existing.DriveTitle = driveDto.DriveTitle;
            existing.Description = driveDto.Description;
            existing.DriveDate = driveDto.DriveDate;
            existing.RegistrationDeadline = driveDto.RegistrationDeadline;
            existing.EligibilityCriteria = driveDto.EligibilityCriteria;
            existing.Package = driveDto.Package;
            existing.JobRoles = driveDto.JobRoles;
            existing.Location = driveDto.Location;
            existing.MaxRegistrations = driveDto.MaxRegistrations;
            existing.Status = driveDto.Status;
            existing.IsActive = driveDto.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateDriveStatusAsync(int driveId, string status)
        {
            var drive = await _context.placementdrive.FindAsync(driveId);
            if (drive == null)
                return false;

            drive.Status = status;
            drive.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelPlacementDriveAsync(int driveId)
        {
            var drive = await _context.placementdrive.FindAsync(driveId);
            if (drive == null)
                return false;

            drive.Status = "Cancelled";
            drive.IsActive = false;
            drive.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeletePlacementDriveAsync(int driveId)
        {
            var drive = await _context.placementdrive.FindAsync(driveId);
            if (drive == null)
                return false;

            _context.placementdrive.Remove(drive);
            await _context.SaveChangesAsync();
            return true;
        }

        // Helper method to map PlacementDrive to DTO
        private static PlacementDriveDTO MapToDTO(PlacementDrive drive, Dictionary<string, string> companies)
        {
            return new PlacementDriveDTO
            {
                DriveId = drive.DriveId,
                CollegeId = drive.CollegeId,
                CompanyId = drive.CompanyId,
                CompanyName = companies.TryGetValue(drive.CompanyId, out var companyName)
                    ? companyName : "Unknown",
                DriveTitle = drive.DriveTitle,
                Description = drive.Description,
                DriveDate = drive.DriveDate,
                RegistrationDeadline = drive.RegistrationDeadline,
                EligibilityCriteria = drive.EligibilityCriteria,
                Package = drive.Package,
                JobRoles = drive.JobRoles,
                Location = drive.Location,
                MaxRegistrations = drive.MaxRegistrations,
                CurrentRegistrations = drive.CurrentRegistrations,
                Status = drive.Status,
                IsActive = drive.IsActive,
                CreatedAt = drive.CreatedAt
            };
        }
    }
}
