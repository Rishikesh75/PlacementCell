package com.example.placementicsbackend.services.mentormeentee.impl;

import com.example.placementicsbackend.services.mentormeentee.interfaces.IEmailService;
import jakarta.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender mailSender;

    @Value("${email.sender-name:PlacementCell}")
    private String senderName;

    @Override
    public boolean sendMeetingInvite(
            String recipientEmail,
            String recipientName,
            String meetingTitle,
            String meetingDescription,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String meetLink,
            String otherAttendeeEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(recipientEmail);
            helper.setSubject("Meeting Invitation: " + meetingTitle);
            helper.setText(generateEmailBody(
                    recipientName,
                    meetingTitle,
                    meetingDescription,
                    startTime,
                    endTime,
                    meetLink,
                    otherAttendeeEmail), true);
            mailSender.send(message);
            return true;
        } catch (Exception ex) {
            System.out.println("Error sending email: " + ex.getMessage());
            return false;
        }
    }

    private String generateEmailBody(
            String recipientName,
            String meetingTitle,
            String meetingDescription,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String meetLink,
            String otherAttendeeEmail) {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");

        return """
                <p>Hello <strong>%s</strong>,</p>
                <p>You have been invited to a meeting.</p>
                <p><strong>Title:</strong> %s</p>
                <p><strong>Description:</strong> %s</p>
                <p><strong>Date:</strong> %s</p>
                <p><strong>Time:</strong> %s - %s (IST)</p>
                <p><strong>Other Attendee:</strong> %s</p>
                <p><a href="%s">Join Meeting</a></p>
                <p>%s</p>
                """.formatted(
                recipientName,
                meetingTitle,
                meetingDescription,
                startTime.format(dateFormatter),
                startTime.format(timeFormatter),
                endTime.format(timeFormatter),
                otherAttendeeEmail,
                meetLink,
                meetLink);
    }
}
