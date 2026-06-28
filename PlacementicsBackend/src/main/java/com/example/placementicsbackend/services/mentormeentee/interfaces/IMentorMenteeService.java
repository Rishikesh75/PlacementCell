package com.example.placementicsbackend.services.mentormeentee.interfaces;

import com.example.placementicsbackend.dtos.MentorMeetingDTOs.MeetingResponse;
import com.example.placementicsbackend.dtos.MentorMeetingDTOs.UpdateMeetingRequest;

public interface IMentorMenteeService {

    MeetingResponse createMentorMenteeMeeting(
            String title,
            String description,
            java.time.LocalDateTime startTime,
            java.time.LocalDateTime endTime,
            String studentEmail,
            String alumniEmail);

    boolean updateMentorMenteeMeeting(UpdateMeetingRequest request);

    boolean deleteMentorMenteeMeeting(String eventId);
}
