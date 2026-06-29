package com.example.placementicsbackend.dtos.MentorMeetingDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingResponse {

    private String meetingId = "";
    private String googleMeetLink = "";
    private String googleEventId = "";
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
