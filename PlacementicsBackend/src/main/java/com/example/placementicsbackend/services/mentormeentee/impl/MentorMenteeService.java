package com.example.placementicsbackend.services.mentormeentee.impl;

import com.example.placementicsbackend.dtos.MentorMeetingDTOs.MeetingResponse;
import com.example.placementicsbackend.dtos.MentorMeetingDTOs.UpdateMeetingRequest;
import com.example.placementicsbackend.services.mentormeentee.interfaces.IMentorMenteeService;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MentorMenteeService implements IMentorMenteeService {

    private final GoogleCalendarService googleCalendarService;

    @Override
    public MeetingResponse createMentorMenteeMeeting(
            String title,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String studentEmail,
            String alumniEmail) {
        try {
            return googleCalendarService.createMeetingWithMeetLink(
                    title, description, startTime, endTime, studentEmail, alumniEmail);
        } catch (Exception ex) {
            System.out.println("Error creating meeting: " + ex.getMessage());
            return null;
        }
    }

    @Override
    public boolean updateMentorMenteeMeeting(UpdateMeetingRequest request) {
        try {
            return googleCalendarService.updateMeeting(
                    request.getEventId(),
                    request.getNewTitle(),
                    request.getNewStartTime(),
                    request.getNewEndTime());
        } catch (Exception ex) {
            System.out.println("Error updating meeting: " + ex.getMessage());
            return false;
        }
    }

    @Override
    public boolean deleteMentorMenteeMeeting(String eventId) {
        try {
            return googleCalendarService.deleteMeeting(eventId);
        } catch (Exception ex) {
            System.out.println("Error deleting meeting: " + ex.getMessage());
            return false;
        }
    }
}
