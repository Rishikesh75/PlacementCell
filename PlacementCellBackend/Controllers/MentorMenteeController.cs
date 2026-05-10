using Microsoft.AspNetCore.Mvc;
using PlacementCellBackend.DTOs.MentorMeetingDTOs;
using PlacementCellBackend.Services.MentorMenteeService;
using PlacementCellBackend.Services.MentorMenteeService.Interface;

namespace PlacementCellBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MentorMenteeController : ControllerBase
{
    private readonly IMentorMenteeService _mentorMenteeService;
    private readonly GoogleCalendarHelper _calendarHelper;
    private readonly IEmailService _emailService;

    public MentorMenteeController(
        IMentorMenteeService mentorMenteeService, 
        GoogleCalendarHelper calendarHelper,
        IEmailService emailService)
    {
        _mentorMenteeService = mentorMenteeService;
        _calendarHelper = calendarHelper;
        _emailService = emailService;
    }

    /// <summary>
    /// Schedule a new mentor-mentee meeting with video link and send email invites
    /// </summary>
    [HttpPost("schedule")]
    public async Task<IActionResult> ScheduleMeeting([FromBody] CreateMeetingRequest request)
    {
        try
        {
            // Create the calendar event with Jitsi Meet link
            var (eventId, meetLink) = await _calendarHelper.CreateMeetingWithMeetLinkAsync(
                request.Title,
                request.Description,
                request.StartTime,
                request.EndTime,
                request.StudentEmail,
                request.AlumniEmail
            );

            // Send email invites to both participants
            var studentEmailTask = _emailService.SendMeetingInviteAsync(
                request.StudentEmail,
                "Student",
                request.Title,
                request.Description,
                request.StartTime,
                request.EndTime,
                meetLink,
                request.AlumniEmail
            );

            var alumniEmailTask = _emailService.SendMeetingInviteAsync(
                request.AlumniEmail,
                "Mentor",
                request.Title,
                request.Description,
                request.StartTime,
                request.EndTime,
                meetLink,
                request.StudentEmail
            );

            // Wait for both emails to be sent
            var emailResults = await Task.WhenAll(studentEmailTask, alumniEmailTask);
            bool studentEmailSent = emailResults[0];
            bool alumniEmailSent = emailResults[1];

            return Ok(new
            {
                message = "Meeting scheduled successfully!",
                meetLink = meetLink,
                eventId = eventId,
                startTime = request.StartTime,
                endTime = request.EndTime,
                emailStatus = new
                {
                    studentEmailSent = studentEmailSent,
                    alumniEmailSent = alumniEmailSent
                }
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new 
            { 
                message = "Failed to create meeting",
                error = ex.Message,
                innerError = ex.InnerException?.Message
            });
        }
    }

    /// <summary>
    /// Reschedule an existing meeting
    /// </summary>
    [HttpPut("reschedule")]
    public async Task<IActionResult> RescheduleMeeting([FromBody] UpdateMeetingRequest request)
    {
        var result = await _mentorMenteeService.UpdateMentorMenteeMeeting(request);

        if (!result)
            return BadRequest(new { message = "Failed to update meeting" });

        return Ok(new { message = "Meeting rescheduled successfully!" });
    }

    /// <summary>
    /// Cancel/Delete a meeting
    /// </summary>
    [HttpDelete("cancel/{eventId}")]
    public async Task<IActionResult> CancelMeeting(string eventId)
    {
        var result = await _mentorMenteeService.DeleteMentorMenteeMeeting(eventId);

        if (!result)
            return BadRequest(new { message = "Failed to cancel meeting" });

        return Ok(new { message = "Meeting cancelled successfully!" });
    }
}
