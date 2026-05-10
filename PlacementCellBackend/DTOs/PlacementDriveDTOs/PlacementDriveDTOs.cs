namespace PlacementCellBackend.DTOs.PlacementDriveDTOs
{
    public class PlacementDriveDTO
    {
        public int DriveId { get; set; }
        public int CollegeId { get; set; }
        public string CompanyId { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string DriveTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly DriveDate { get; set; }
        public DateOnly RegistrationDeadline { get; set; }
        public string EligibilityCriteria { get; set; } = string.Empty;
        public string Package { get; set; } = string.Empty;
        public string JobRoles { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int? MaxRegistrations { get; set; }
        public int CurrentRegistrations { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreatePlacementDriveDTO
    {
        public int CollegeId { get; set; }
        public string CompanyId { get; set; } = string.Empty;
        public string DriveTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly DriveDate { get; set; }
        public DateOnly RegistrationDeadline { get; set; }
        public string EligibilityCriteria { get; set; } = string.Empty;
        public string Package { get; set; } = string.Empty;
        public string JobRoles { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int? MaxRegistrations { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class UpdatePlacementDriveDTO
    {
        public string DriveTitle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly DriveDate { get; set; }
        public DateOnly RegistrationDeadline { get; set; }
        public string EligibilityCriteria { get; set; } = string.Empty;
        public string Package { get; set; } = string.Empty;
        public string JobRoles { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int? MaxRegistrations { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }
}
