package com.example.placementicsbackend.services.placements.interfaces;

import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningCreateDto;
import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningDto;
import java.util.List;

public interface IAlumniPlacementService {

    List<AlumniJobOpeningDto> getAllAlumniJobPositions();

    AlumniJobOpeningDto getAlumniPlacementById(int id);

    boolean createAlumniPlacement(AlumniJobOpeningCreateDto alumniPlacement);

    boolean updateAlumniPlacement(int id, AlumniJobOpeningCreateDto alumniPlacement);

    boolean deleteAlumniPlacement(int id);
}
