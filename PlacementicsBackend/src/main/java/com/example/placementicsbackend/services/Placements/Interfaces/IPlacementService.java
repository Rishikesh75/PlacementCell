package com.example.placementicsbackend.services.Placements.Interfaces;

import com.example.placementicsbackend.dtos.PlacementDTOs.CreatePlacementDto;
import com.example.placementicsbackend.dtos.PlacementDTOs.PlacementDTO;
import com.example.placementicsbackend.models.Placement;
import java.util.List;

public interface IPlacementService {

    List<PlacementDTO> getAllPlacements();

    PlacementDTO getPlacementById(int id);

    Placement createPlacement(CreatePlacementDto placement);

    boolean updatePlacement(int id, CreatePlacementDto placement);

    boolean deletePlacement(int id);
}
