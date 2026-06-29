package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.PlacementDrive;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Integer> {

    List<PlacementDrive> findByCollegeId(Integer collegeId);

    List<PlacementDrive> findByCompanyId(String companyId);

    List<PlacementDrive> findByDriveDate(LocalDate driveDate);

    List<PlacementDrive> findByDriveDateGreaterThanEqualAndActiveTrueAndStatusNotInOrderByDriveDateAsc(
            LocalDate driveDate, List<String> excludedStatuses);
}
