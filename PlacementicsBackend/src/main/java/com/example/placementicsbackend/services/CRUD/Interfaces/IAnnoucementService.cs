namespace PlacementCellBackend.Services.CRUD;

public interface IAnnoucementService
{
    Task<bool>  CreateAnnouncementByBatch();
    Task<bool> DeleteAnnouncement();
    Task<bool> UpdateAnnouncement();
    Task<bool> GetAnnouncementById();
    Task<bool> GetAllAnnouncements();
}