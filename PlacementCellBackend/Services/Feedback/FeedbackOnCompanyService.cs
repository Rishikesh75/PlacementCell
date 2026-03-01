using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Models.FeedBacks;
using PlacementCellBackend.Services.Feedback.Interfaces;

namespace PlacementCellBackend.Services.Feedback
{
    public class FeedbackOnCompanyService : IFeedbackOnCompanyService
    {
        private readonly AppDbContext _context;

        public FeedbackOnCompanyService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AlumniFeedBackOnCompanyDTO>> GetAllFeedbacksAsync()
        {
            // Step 1: Get all feedbacks
            var feedbacks = await _context.alumnifeedbackoncompany.ToListAsync();

            if (!feedbacks.Any())
            {
                return Enumerable.Empty<AlumniFeedBackOnCompanyDTO>();
            }

            // Step 2: Get unique company IDs and fetch company names
            var CompanyIds = feedbacks.Select(fb => fb.CompanyId).Distinct().ToList();
            var companies = await _context.company
                .Where(c => CompanyIds.Contains(c.CompanyId))
                .ToDictionaryAsync(c => c.CompanyId, c => c.CompanyName);

            // Step 3: Get unique alumni IDs and fetch alumni profiles
            var Ids = feedbacks.Select(fb => fb.AlumniId).Distinct().ToList();
            var alumniProfiles = await _context.alumni
                .Where(a => Ids.Contains(a.Id))
                .ToDictionaryAsync(a => a.Id, a => a.Linkdinprofile ?? "");

            // Step 4: Map to DTOs
            var result = feedbacks.Select(fb => new AlumniFeedBackOnCompanyDTO
            {
                companyName = companies.TryGetValue(fb.CompanyId, out var companyName) 
                    ? companyName : "Unknown",
                AlumniProfile = alumniProfiles.TryGetValue(fb.AlumniId, out var profile) 
                    ? profile : "",
                jobProfile = fb.JobProfile,
                CTC = fb.CTC,
                JobLocation = fb.JobLocation,
                JobType = fb.JobType,
                WorkMode = fb.WorkMode,
                CodingRoundInfo = fb.CodingRoundInfo,
                TechnicalRoundInfo = fb.TechnicalRoundInfo,
                HRRoundInfo = fb.HRRoundInfo,
                ResourcesInfo = fb.ResourcesInfo
            }).ToList();

            return result;
        }

        public async Task<AlumniFeedBackOnCompanyDTO?> GetFeedbackByIdAsync(string id)
        {
            // Parse the string id to int (since Id is int)
            if (!int.TryParse(id, out var Id))
            {
                return null;
            }

            var feedback = await _context.alumnifeedbackoncompany.FindAsync(Id);

            if (feedback == null)
            {
                return null;
            }

            // Get company name
            var companyName = await _context.company
                .Where(c => c.CompanyId == feedback.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get alumni profile
            var alumniProfile = await _context.alumni
                .Where(a => a.Id == feedback.AlumniId)
                .Select(a => a.Linkdinprofile)
                .FirstOrDefaultAsync() ?? "";

            return new AlumniFeedBackOnCompanyDTO
            {
                companyName = companyName,
                AlumniProfile = alumniProfile,
                jobProfile = feedback.JobProfile,
                CTC = feedback.CTC,
                JobLocation = feedback.JobLocation,
                JobType = feedback.JobType,
                WorkMode = feedback.WorkMode,
                CodingRoundInfo = feedback.CodingRoundInfo,
                TechnicalRoundInfo = feedback.TechnicalRoundInfo,
                HRRoundInfo = feedback.HRRoundInfo,
                ResourcesInfo = feedback.ResourcesInfo
            };
        }

        public async Task<AlumniFeedBackOnCompanyDTO> CreateFeedbackAsync(AlumniFeedBackOnCompanyCreateDTO feedback)
        {
            // Map DTO to Model
            var feedbackModel = new AlumniFeedBackonCompany
            {
                CompanyId = feedback.CompanyId,
                Id = feedback.Id,
                JobProfile = feedback.jobProfile,
                CTC = feedback.CTC,
                JobLocation = feedback.JobLocation,
                JobType = feedback.JobType,
                WorkMode = feedback.WorkMode,
                CodingRoundInfo = feedback.CodingRoundInfo,
                TechnicalRoundInfo = feedback.TechnicalRoundInfo,
                HRRoundInfo = feedback.HRRoundInfo,
                ResourcesInfo = feedback.ResourcesInfo
            };

            _context.alumnifeedbackoncompany.Add(feedbackModel);
            await _context.SaveChangesAsync();

            // Get company name for response
            var companyName = await _context.company
                .Where(c => c.CompanyId == feedback.CompanyId)
                .Select(c => c.CompanyName)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get alumni profile for response
            var alumniProfile = await _context.alumni
                .Where(a => a.Id == feedback.Id)
                .Select(a => a.Linkdinprofile)
                .FirstOrDefaultAsync() ?? "";

            // Return DTO with all info
            return new AlumniFeedBackOnCompanyDTO
            {
                companyName = companyName,
                AlumniProfile = alumniProfile,
                jobProfile = feedbackModel.JobProfile,
                CTC = feedbackModel.CTC,
                JobLocation = feedbackModel.JobLocation,
                JobType = feedbackModel.JobType,
                WorkMode = feedbackModel.WorkMode,
                CodingRoundInfo = feedbackModel.CodingRoundInfo,
                TechnicalRoundInfo = feedbackModel.TechnicalRoundInfo,
                HRRoundInfo = feedbackModel.HRRoundInfo,
                ResourcesInfo = feedbackModel.ResourcesInfo
            };
        }

        public async Task<bool> UpDateFeedbackAsync(int id, AlumniFeedBackOnCompanyCreateDTO feedback)
        {
            var existing = await _context.alumnifeedbackoncompany.FindAsync(id);
            if (existing == null)
                return false;

            // UpDate properties from DTO
            existing.CompanyId = feedback.CompanyId;
            existing.Id = feedback.Id;
            existing.JobProfile = feedback.jobProfile;
            existing.CTC = feedback.CTC;
            existing.JobLocation = feedback.JobLocation;
            existing.JobType = feedback.JobType;
            existing.WorkMode = feedback.WorkMode;
            existing.CodingRoundInfo = feedback.CodingRoundInfo;
            existing.TechnicalRoundInfo = feedback.TechnicalRoundInfo;
            existing.HRRoundInfo = feedback.HRRoundInfo;
            existing.ResourcesInfo = feedback.ResourcesInfo;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFeedbackAsync(int id)
        {
            var feedback = await _context.alumnifeedbackoncompany.FindAsync(id);
            if (feedback == null)
                return false;

            _context.alumnifeedbackoncompany.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

