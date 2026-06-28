package com.example.placementicsbackend.services.mentormeentee.interfaces;

import java.time.LocalDateTime;

public interface IEmailService {

    boolean sendMeetingInvite(
            String recipientEmail,
            String recipientName,
            String meetingTitle,
            String meetingDescription,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String meetLink,
            String otherAttendeeEmail);
}
