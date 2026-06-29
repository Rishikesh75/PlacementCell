package com.example.placementicsbackend.services.Placements.Interfaces;

import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningCreateDto;
import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningDto;
import java.util.List;

public interface ITeacherPlacementService {

    List<ResearchOpeningDto> getAllTeacherResearchOpenings();

    ResearchOpeningDto getTeacherResearchOpeningById(int id);

    ResearchOpeningDto createTeacherResearchOpening(ResearchOpeningCreateDto researchOpening);

    boolean updateTeacherResearchOpening(int id, ResearchOpeningCreateDto researchOpening);

    boolean deleteTeacherResearchOpening(int id);
}
