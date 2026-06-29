package com.example.placementicsbackend.dtos.MentorMeetingDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMeetingRequest {

    private String eventId = "";
    private String newTitle;
    private LocalDateTime newStartTime;
    private LocalDateTime newEndTime;
}
