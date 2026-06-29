package com.example.placementicsbackend.dtos.MentorMeetingDTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMeetingRequest {

    private String studentId = "";
    private String alumniId = "";
    private String title = "";
    private String description = "";
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String studentEmail = "";
    private String alumniEmail = "";
}
