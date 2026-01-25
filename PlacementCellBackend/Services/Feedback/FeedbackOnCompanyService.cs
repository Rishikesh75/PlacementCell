using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.DTOs;
using PlacementCellBackend.Models;
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
            var companyIds = feedbacks.Select(fb => fb.companyid).Distinct().ToList();
            var companies = await _context.company
                .Where(c => companyIds.Contains(c.company_id))
                .ToDictionaryAsync(c => c.company_id, c => c.company_name);

            // Step 3: Get unique alumni IDs and fetch alumni profiles
            var alumniIds = feedbacks.Select(fb => fb.alumniid).Distinct().ToList();
            var alumniProfiles = await _context.alumni
                .Where(a => alumniIds.Contains(a.alumniid))
                .ToDictionaryAsync(a => a.alumniid, a => a.linkdinprofile ?? "");

            // Step 4: Map to DTOs
            var result = feedbacks.Select(fb => new AlumniFeedBackOnCompanyDTO
            {
                companyName = companies.TryGetValue(fb.companyid, out var companyName) 
                    ? companyName : "Unknown",
                AlumniProfile = alumniProfiles.TryGetValue(fb.alumniid, out var profile) 
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
            // Parse the string id to int (since feedbackid is int)
            if (!int.TryParse(id, out var feedbackId))
            {
                return null;
            }

            var feedback = await _context.alumnifeedbackoncompany.FindAsync(feedbackId);

            if (feedback == null)
            {
                return null;
            }

            // Get company name
            var companyName = await _context.company
                .Where(c => c.company_id == feedback.companyid)
                .Select(c => c.company_name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get alumni profile
            var alumniProfile = await _context.alumni
                .Where(a => a.alumniid == feedback.alumniid)
                .Select(a => a.linkdinprofile)
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
                companyid = feedback.companyid,
                alumniid = feedback.alumniid,
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
                .Where(c => c.company_id == feedback.companyid)
                .Select(c => c.company_name)
                .FirstOrDefaultAsync() ?? "Unknown";

            // Get alumni profile for response
            var alumniProfile = await _context.alumni
                .Where(a => a.alumniid == feedback.alumniid)
                .Select(a => a.linkdinprofile)
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

        public async Task<bool> UpdateFeedbackAsync(int id, AlumniFeedBackOnCompanyCreateDTO feedback)
        {
            var existing = await _context.alumnifeedbackoncompany.FindAsync(id);
            if (existing == null)
                return false;

            // Update properties from DTO
            existing.companyid = feedback.companyid;
            existing.alumniid = feedback.alumniid;
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

