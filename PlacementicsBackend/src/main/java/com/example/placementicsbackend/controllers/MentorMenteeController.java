package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.dtos.MentorMeetingDTOs.CreateMeetingRequest;
import com.example.placementicsbackend.dtos.MentorMeetingDTOs.MeetingResponse;
import com.example.placementicsbackend.dtos.MentorMeetingDTOs.UpdateMeetingRequest;
import com.example.placementicsbackend.services.mentormeentee.impl.GoogleCalendarService;
import com.example.placementicsbackend.services.mentormeentee.interfaces.IEmailService;
import com.example.placementicsbackend.services.mentormeentee.interfaces.IMentorMenteeService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mentor-mentee")
@RequiredArgsConstructor
public class MentorMenteeController {

    private final IMentorMenteeService mentorMenteeService;
    private final GoogleCalendarService calendarService;
    private final IEmailService emailService;

    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleMeeting(@RequestBody CreateMeetingRequest request) {
        try {
            MeetingResponse meeting = calendarService.createMeetingWithMeetLink(
                    request.getTitle(),
                    request.getDescription(),
                    request.getStartTime(),
                    request.getEndTime(),
                    request.getStudentEmail(),
                    request.getAlumniEmail());

            boolean studentEmailSent = emailService.sendMeetingInvite(
                    request.getStudentEmail(),
                    "Student",
                    request.getTitle(),
                    request.getDescription(),
                    request.getStartTime(),
                    request.getEndTime(),
                    meeting.getGoogleMeetLink(),
                    request.getAlumniEmail());

            boolean mentorEmailSent = emailService.sendMeetingInvite(
                    request.getAlumniEmail(),
                    "Mentor",
                    request.getTitle(),
                    request.getDescription(),
                    request.getStartTime(),
                    request.getEndTime(),
                    meeting.getGoogleMeetLink(),
                    request.getStudentEmail());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Meeting scheduled successfully!");
            response.put("eventId", meeting.getGoogleEventId());
            response.put("meetLink", meeting.getGoogleMeetLink());
            response.put("startTime", request.getStartTime());
            response.put("endTime", request.getEndTime());
            response.put("emailStatus", Map.of(
                    "studentEmailSent", studentEmailSent,
                    "mentorEmailSent", mentorEmailSent));
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            Map<String, Object> error = new HashMap<>();
            error.put("message", "Failed to create meeting");
            error.put("error", ex.getMessage());
            if (ex.getCause() != null) {
                error.put("innerError", ex.getCause().getMessage());
            }
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/reschedule")
    public ResponseEntity<?> rescheduleMeeting(@RequestBody UpdateMeetingRequest request) {
        if (!mentorMenteeService.updateMentorMenteeMeeting(request)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to update meeting"));
        }
        return ResponseEntity.ok(Map.of("message", "Meeting rescheduled successfully!"));
    }

    @DeleteMapping("/cancel/{eventId}")
    public ResponseEntity<?> cancelMeeting(@PathVariable String eventId) {
        if (!mentorMenteeService.deleteMentorMenteeMeeting(eventId)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to cancel meeting"));
        }
        return ResponseEntity.ok(Map.of("message", "Meeting cancelled successfully!"));
    }
}
