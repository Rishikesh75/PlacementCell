package com.example.placementicsbackend.services.placements.interfaces;

import com.example.placementicsbackend.dtos.PlacementDriveDTOs.CreatePlacementDriveDto;
import com.example.placementicsbackend.dtos.PlacementDriveDTOs.PlacementDriveDto;
import com.example.placementicsbackend.dtos.PlacementDriveDTOs.UpdatePlacementDriveDto;
import java.time.LocalDate;
import java.util.List;

public interface IPlacementDriveService {

    List<PlacementDriveDto> getAllPlacementDrives();

    List<PlacementDriveDto> getPlacementDrivesByCollege(int collegeId);

    List<PlacementDriveDto> getPlacementDrivesByCompany(String companyId);

    List<PlacementDriveDto> getPlacementDrivesByDate(LocalDate date);

    List<PlacementDriveDto> getUpcomingPlacementDrives();

    PlacementDriveDto getPlacementDriveById(int driveId);

    PlacementDriveDto schedulePlacementDrive(CreatePlacementDriveDto driveDto);

    boolean updatePlacementDrive(int driveId, UpdatePlacementDriveDto driveDto);

    boolean updateDriveStatus(int driveId, String status);

    boolean cancelPlacementDrive(int driveId);

    boolean deletePlacementDrive(int driveId);
}
