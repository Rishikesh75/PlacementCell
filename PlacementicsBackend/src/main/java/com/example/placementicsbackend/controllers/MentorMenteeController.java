package com.example.placementicsbackend.controllers;

import com.example.dto.CreateMeetingRequest;
import com.example.dto.UpdateMeetingRequest;
import com.example.service.EmailService;
import com.example.service.GoogleCalendarService;
import com.example.service.MentorMenteeService;
import com.example.util.MeetingResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mentor-mentee")
public class MentorMenteeController {

    private final MentorMenteeService mentorMenteeService;
    private final GoogleCalendarService calendarService;
    private final EmailService emailService;

    public MentorMenteeController(
            MentorMenteeService mentorMenteeService,
            GoogleCalendarService calendarService,
            EmailService emailService) {

        this.mentorMenteeService = mentorMenteeService;
        this.calendarService = calendarService;
        this.emailService = emailService;
    }

    /**
     * Schedule a new mentor-mentee meeting.
     */
    @PostMapping("/schedule")
    public ResponseEntity<?> scheduleMeeting(
            @RequestBody CreateMeetingRequest request) {

        try {

            // Create Calendar Event
            MeetingResponse meeting =
                    calendarService.createMeetingWithMeetLink(
                            request.getTitle(),
                            request.getDescription(),
                            request.getStartTime(),
                            request.getEndTime(),
                            request.getStudentEmail(),
                            request.getAlumniEmail());

            // Send Email to Student
            boolean studentEmailSent =
                    emailService.sendMeetingInvite(
                            request.getStudentEmail(),
                            "Student",
                            request.getTitle(),
                            request.getDescription(),
                            request.getStartTime(),
                            request.getEndTime(),
                            meeting.getMeetLink(),
                            request.getAlumniEmail());

            // Send Email to Mentor
            boolean mentorEmailSent =
                    emailService.sendMeetingInvite(
                            request.getAlumniEmail(),
                            "Mentor",
                            request.getTitle(),
                            request.getDescription(),
                            request.getStartTime(),
                            request.getEndTime(),
                            meeting.getMeetLink(),
                            request.getStudentEmail());

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Meeting scheduled successfully!");
            response.put("eventId", meeting.getEventId());
            response.put("meetLink", meeting.getMeetLink());
            response.put("startTime", request.getStartTime());
            response.put("endTime", request.getEndTime());

            Map<String, Boolean> emailStatus = new HashMap<>();
            emailStatus.put("studentEmailSent", studentEmailSent);
            emailStatus.put("mentorEmailSent", mentorEmailSent);

            response.put("emailStatus", emailStatus);

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

    /**
     * Reschedule Meeting
     */
    @PutMapping("/reschedule")
    public ResponseEntity<?> rescheduleMeeting(
            @RequestBody UpdateMeetingRequest request) {

        boolean result =
                mentorMenteeService.updateMentorMenteeMeeting(request);

        if (!result) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message",
                            "Failed to update meeting"));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Meeting rescheduled successfully!"
                ));
    }

    /**
     * Cancel Meeting
     */
    @DeleteMapping("/cancel/{eventId}")
    public ResponseEntity<?> cancelMeeting(
            @PathVariable String eventId) {

        boolean result =
                mentorMenteeService.deleteMentorMenteeMeeting(eventId);

        if (!result) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "message",
                            "Failed to cancel meeting"));
        }

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Meeting cancelled successfully!"
                ));
    }

}