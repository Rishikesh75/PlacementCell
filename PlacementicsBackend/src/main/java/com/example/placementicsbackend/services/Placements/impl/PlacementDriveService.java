package com.example.placementicsbackend.services.Placements.impl;

import com.example.placementicsbackend.dtos.PlacementDriveDTOs.CreatePlacementDriveDto;
import com.example.placementicsbackend.dtos.PlacementDriveDTOs.PlacementDriveDto;
import com.example.placementicsbackend.dtos.PlacementDriveDTOs.UpdatePlacementDriveDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.PlacementDrive;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.repositories.PlacementDriveRepository;
import com.example.placementicsbackend.services.Placements.Interfaces.IPlacementDriveService;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PlacementDriveService implements IPlacementDriveService {

    private final PlacementDriveRepository placementDriveRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDriveDto> getAllPlacementDrives() {
        return mapDrives(placementDriveRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDriveDto> getPlacementDrivesByCollege(int collegeId) {
        return mapDrives(placementDriveRepository.findByCollegeId(collegeId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDriveDto> getPlacementDrivesByCompany(String companyId) {
        List<PlacementDrive> drives = placementDriveRepository.findByCompanyId(companyId);
        if (drives.isEmpty()) {
            return List.of();
        }

        String companyName = companyRepository.findById(companyId)
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return drives.stream()
                .map(drive -> mapToDto(drive, Map.of(companyId, companyName)))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDriveDto> getPlacementDrivesByDate(LocalDate date) {
        return mapDrives(placementDriveRepository.findByDriveDate(date));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDriveDto> getUpcomingPlacementDrives() {
        LocalDate today = LocalDate.now(ZoneOffset.UTC);
        return mapDrives(placementDriveRepository
                .findByDriveDateGreaterThanEqualAndActiveTrueAndStatusNotInOrderByDriveDateAsc(
                        today, List.of("Cancelled", "Completed")));
    }

    @Override
    @Transactional(readOnly = true)
    public PlacementDriveDto getPlacementDriveById(int driveId) {
        PlacementDrive drive = placementDriveRepository.findById(driveId).orElse(null);
        if (drive == null) {
            return null;
        }

        String companyName = companyRepository.findById(drive.getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return mapToDto(drive, Map.of(drive.getCompanyId(), companyName));
    }

    @Override
    public PlacementDriveDto schedulePlacementDrive(CreatePlacementDriveDto driveDto) {
        PlacementDrive drive = new PlacementDrive();
        drive.setCollegeId(driveDto.getCollegeId());
        drive.setCompanyId(driveDto.getCompanyId());
        drive.setDriveTitle(driveDto.getDriveTitle());
        drive.setDescription(driveDto.getDescription());
        drive.setDriveDate(driveDto.getDriveDate());
        drive.setRegistrationDeadline(driveDto.getRegistrationDeadline());
        drive.setEligibilityCriteria(driveDto.getEligibilityCriteria());
        drive.setPackageOffer(driveDto.getPkg());
        drive.setJobRoles(driveDto.getJobRoles());
        drive.setLocation(driveDto.getLocation());
        drive.setMaxRegistrations(driveDto.getMaxRegistrations());
        drive.setActive(driveDto.isActive());
        drive.setStatus("Scheduled");
        drive.setCreatedAt(Instant.now());
        drive.setCurrentRegistrations(0);

        PlacementDrive saved = placementDriveRepository.save(drive);
        String companyName = companyRepository.findById(saved.getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return mapToDto(saved, Map.of(saved.getCompanyId(), companyName));
    }

    @Override
    public boolean updatePlacementDrive(int driveId, UpdatePlacementDriveDto driveDto) {
        PlacementDrive existing = placementDriveRepository.findById(driveId).orElse(null);
        if (existing == null) {
            return false;
        }

        existing.setDriveTitle(driveDto.getDriveTitle());
        existing.setDescription(driveDto.getDescription());
        existing.setDriveDate(driveDto.getDriveDate());
        existing.setRegistrationDeadline(driveDto.getRegistrationDeadline());
        existing.setEligibilityCriteria(driveDto.getEligibilityCriteria());
        existing.setPackageOffer(driveDto.getPkg());
        existing.setJobRoles(driveDto.getJobRoles());
        existing.setLocation(driveDto.getLocation());
        existing.setMaxRegistrations(driveDto.getMaxRegistrations());
        existing.setStatus(driveDto.getStatus());
        existing.setActive(driveDto.isActive());
        existing.setUpdatedAt(Instant.now());
        placementDriveRepository.save(existing);
        return true;
    }

    @Override
    public boolean updateDriveStatus(int driveId, String status) {
        PlacementDrive drive = placementDriveRepository.findById(driveId).orElse(null);
        if (drive == null) {
            return false;
        }

        drive.setStatus(status);
        drive.setUpdatedAt(Instant.now());
        placementDriveRepository.save(drive);
        return true;
    }

    @Override
    public boolean cancelPlacementDrive(int driveId) {
        PlacementDrive drive = placementDriveRepository.findById(driveId).orElse(null);
        if (drive == null) {
            return false;
        }

        drive.setStatus("Cancelled");
        drive.setActive(false);
        drive.setUpdatedAt(Instant.now());
        placementDriveRepository.save(drive);
        return true;
    }

    @Override
    public boolean deletePlacementDrive(int driveId) {
        if (!placementDriveRepository.existsById(driveId)) {
            return false;
        }
        placementDriveRepository.deleteById(driveId);
        return true;
    }

    private List<PlacementDriveDto> mapDrives(List<PlacementDrive> drives) {
        if (drives.isEmpty()) {
            return List.of();
        }

        List<String> companyIds = drives.stream()
                .map(PlacementDrive::getCompanyId)
                .distinct()
                .toList();
        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return drives.stream()
                .map(drive -> mapToDto(drive, companies))
                .toList();
    }

    private PlacementDriveDto mapToDto(PlacementDrive drive, Map<String, String> companies) {
        PlacementDriveDto dto = new PlacementDriveDto();
        dto.setDriveId(drive.getDriveId());
        dto.setCollegeId(drive.getCollegeId());
        dto.setCompanyId(drive.getCompanyId());
        dto.setCompanyName(companies.getOrDefault(drive.getCompanyId(), "Unknown"));
        dto.setDriveTitle(drive.getDriveTitle());
        dto.setDescription(drive.getDescription());
        dto.setDriveDate(drive.getDriveDate());
        dto.setRegistrationDeadline(drive.getRegistrationDeadline());
        dto.setEligibilityCriteria(drive.getEligibilityCriteria());
        dto.setPkg(drive.getPackageOffer());
        dto.setJobRoles(drive.getJobRoles());
        dto.setLocation(drive.getLocation());
        dto.setMaxRegistrations(drive.getMaxRegistrations());
        dto.setCurrentRegistrations(drive.getCurrentRegistrations());
        dto.setStatus(drive.getStatus());
        dto.setActive(drive.isActive());
        if (drive.getCreatedAt() != null) {
            dto.setCreatedAt(LocalDateTime.ofInstant(drive.getCreatedAt(), ZoneOffset.UTC));
        }
        return dto;
    }
}
