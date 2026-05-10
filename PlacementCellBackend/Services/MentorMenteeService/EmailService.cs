using System.Net;
using System.Net.Mail;
using PlacementCellBackend.Services.MentorMenteeService.Interface;

namespace PlacementCellBackend.Services.MentorMenteeService;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<bool> SendMeetingInviteAsync(
        string recipientEmail,
        string recipientName,
        string meetingTitle,
        string meetingDescription,
        DateTime startTime,
        DateTime endTime,
        string meetLink,
        string otherAttendeeEmail)
    {
        try
        {
            var smtpHost = _configuration["Email:SmtpHost"] ?? "smtp.gmail.com";
            var smtpPort = int.Parse(_configuration["Email:SmtpPort"] ?? "587");
            var senderEmail = _configuration["Email:SenderEmail"];
            var senderPassword = _configuration["Email:SenderPassword"];
            var senderName = _configuration["Email:SenderName"] ?? "PlacementCell";

            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(senderEmail, senderPassword)
            };

            var message = new MailMessage
            {
                From = new MailAddress(senderEmail!, senderName),
                Subject = $"📅 Meeting Invitation: {meetingTitle}",
                IsBodyHtml = true,
                Body = GenerateEmailBody(
                    recipientName,
                    meetingTitle,
                    meetingDescription,
                    startTime,
                    endTime,
                    meetLink,
                    otherAttendeeEmail)
            };

            message.To.Add(recipientEmail);

            await client.SendMailAsync(message);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            return false;
        }
    }

    private string GenerateEmailBody(
        string recipientName,
        string meetingTitle,
        string meetingDescription,
        DateTime startTime,
        DateTime endTime,
        string meetLink,
        string otherAttendeeEmail)
    {
        return $@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }}
        .header h1 {{ margin: 0; font-size: 24px; }}
        .content {{ padding: 30px; }}
        .meeting-card {{ background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }}
        .meeting-title {{ font-size: 20px; font-weight: bold; color: #333; margin-bottom: 10px; }}
        .meeting-detail {{ margin: 10px 0; color: #555; }}
        .meeting-detail strong {{ color: #333; }}
        .join-button {{ display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }}
        .join-button:hover {{ opacity: 0.9; }}
        .footer {{ background-color: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px; }}
        .link-box {{ background-color: #e8f4fd; padding: 15px; border-radius: 5px; word-break: break-all; margin: 15px 0; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>📅 Meeting Invitation</h1>
        </div>
        <div class='content'>
            <p>Hello <strong>{recipientName}</strong>,</p>
            <p>You have been invited to a meeting. Please find the details below:</p>
            
            <div class='meeting-card'>
                <div class='meeting-title'>{meetingTitle}</div>
                <div class='meeting-detail'><strong>📝 Description:</strong> {meetingDescription}</div>
                <div class='meeting-detail'><strong>📅 Date:</strong> {startTime:dddd, MMMM dd, yyyy}</div>
                <div class='meeting-detail'><strong>🕐 Time:</strong> {startTime:hh:mm tt} - {endTime:hh:mm tt} (IST)</div>
                <div class='meeting-detail'><strong>👥 Other Attendee:</strong> {otherAttendeeEmail}</div>
            </div>
            
            <div style='text-align: center;'>
                <a href='{meetLink}' class='join-button'>🎥 Join Meeting</a>
            </div>
            
            <p><strong>Meeting Link:</strong></p>
            <div class='link-box'>
                <a href='{meetLink}'>{meetLink}</a>
            </div>
            
            <p style='color: #888; font-size: 14px;'>
                💡 <strong>Tip:</strong> Click the link at the scheduled time to join. No account or download required!
            </p>
        </div>
        <div class='footer'>
            <p>This is an automated message from PlacementCell.</p>
            <p>© 2026 PlacementCell. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
    }
}
