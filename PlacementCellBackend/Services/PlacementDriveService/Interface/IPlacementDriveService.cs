namespace PlacementCellBackend.Services.PlacementDriveService.Interface;
public interface IPlacementDriveService
{
    public Task<bool> ScheduleNewPlacementDriveSlot();

    public Task<bool> ReschedulePlacementDriveSlot();

    public Task<bool> PublishFormWithEligibiltyCriteria();//publish the the form

    public Task<bool> RegisterForCompanyDrive();
}