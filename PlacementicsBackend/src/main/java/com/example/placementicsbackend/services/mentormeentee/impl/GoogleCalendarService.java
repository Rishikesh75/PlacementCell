package com.example.placementicsbackend.services.mentormeentee.impl;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.example.placementicsbackend.dtos.MentorMeetingDTOs.MeetingResponse;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GoogleCalendarService {

    private static final ZoneId IST = ZoneId.of("Asia/Kolkata");

    @Value("${google.calendar.service-account-key-path:}")
    private String serviceAccountKeyPath;

    @Value("${google.calendar.application-name:PlacementCell MentorMentee}")
    private String applicationName;

    private Calendar calendarService;

    public MeetingResponse createMeetingWithMeetLink(
            String title,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            String studentEmail,
            String alumniEmail) throws Exception {
        Calendar service = getCalendarService();

        String meetingId = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        String jitsiMeetLink = "https://meet.jit.si/PlacementCell-" + meetingId;

        Event event = new Event()
                .setSummary(title)
                .setDescription(description + "\n\nVideo Meeting Link: " + jitsiMeetLink
                        + "\n\nAttendees:\n- " + studentEmail + "\n- " + alumniEmail)
                .setStart(toEventDateTime(startTime))
                .setEnd(toEventDateTime(endTime))
                .setReminders(new Event.Reminders()
                        .setUseDefault(false)
                        .setOverrides(List.of(new EventReminder().setMethod("popup").setMinutes(10))));

        Event createdEvent = service.events()
                .insert("primary", event)
                .setSendUpdates("none")
                .execute();

        MeetingResponse response = new MeetingResponse();
        response.setMeetingId(UUID.randomUUID().toString());
        response.setGoogleEventId(createdEvent.getId());
        response.setGoogleMeetLink(jitsiMeetLink);
        response.setStartTime(startTime);
        response.setEndTime(endTime);
        return response;
    }

    public boolean updateMeeting(
            String eventId,
            String newTitle,
            LocalDateTime newStartTime,
            LocalDateTime newEndTime) throws Exception {
        Calendar service = getCalendarService();
        Event existingEvent = service.events().get("primary", eventId).execute();

        if (newTitle != null) {
            existingEvent.setSummary(newTitle);
        }
        if (newStartTime != null) {
            existingEvent.setStart(toEventDateTime(newStartTime));
        }
        if (newEndTime != null) {
            existingEvent.setEnd(toEventDateTime(newEndTime));
        }

        service.events()
                .update("primary", eventId, existingEvent)
                .setSendUpdates("none")
                .execute();
        return true;
    }

    public boolean deleteMeeting(String eventId) throws Exception {
        Calendar service = getCalendarService();
        service.events()
                .delete("primary", eventId)
                .setSendUpdates("none")
                .execute();
        return true;
    }

    private Calendar getCalendarService() throws Exception {
        if (calendarService != null) {
            return calendarService;
        }

        if (serviceAccountKeyPath == null || serviceAccountKeyPath.isBlank()) {
            throw new IllegalStateException("google.calendar.service-account-key-path is not configured");
        }

        GoogleCredentials credential;
        try (FileInputStream stream = new FileInputStream(serviceAccountKeyPath)) {
            credential = GoogleCredentials.fromStream(stream)
                    .createScoped(Collections.singleton(CalendarScopes.CALENDAR));
        }

        calendarService = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credential))
                .setApplicationName(applicationName)
                .build();

        return calendarService;
    }

    private EventDateTime toEventDateTime(LocalDateTime dateTime) {
        return new EventDateTime()
                .setDateTime(new DateTime(dateTime.atZone(IST).toInstant().toEpochMilli()))
                .setTimeZone(IST.getId());
    }
}
