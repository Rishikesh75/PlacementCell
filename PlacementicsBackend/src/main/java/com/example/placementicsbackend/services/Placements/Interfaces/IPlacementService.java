package com.example.placementicsbackend.services.Placements.Interfaces;

import com.example.placementicsbackend.dtos.PlacementDTOs.CreatePlacementDto;
import com.example.placementicsbackend.dtos.PlacementDTOs.PlacementDto;
import com.example.placementicsbackend.models.Placement;
import java.util.List;

public interface IPlacementService {

    List<PlacementDto> getAllPlacements();

    PlacementDto getPlacementById(int id);

    Placement createPlacement(CreatePlacementDto placement);

    boolean updatePlacement(int id, CreatePlacementDto placement);

    boolean deletePlacement(int id);
}
