package com.example.placementicsbackend.services.Placements.impl;

import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningCreateDto;
import com.example.placementicsbackend.dtos.ReasearchOpeningsDtos.ResearchOpeningDto;
import com.example.placementicsbackend.models.Teacher;
import com.example.placementicsbackend.models.JobOpening.ResearchOpening;
import com.example.placementicsbackend.repositories.ResearchOpeningRepository;
import com.example.placementicsbackend.repositories.TeacherRepository;
import com.example.placementicsbackend.services.Placements.Interfaces.ITeacherPlacementService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherPlacementService implements ITeacherPlacementService {

    private final ResearchOpeningRepository researchOpeningRepository;
    private final TeacherRepository teacherRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ResearchOpeningDto> getAllTeacherResearchOpenings() {
        List<ResearchOpening> researchOpenings = researchOpeningRepository.findAll();
        if (researchOpenings.isEmpty()) {
            return List.of();
        }

        List<String> teacherIds = researchOpenings.stream()
                .map(opening -> opening.getTeacher().getId())
                .distinct()
                .toList();
        Map<String, String> teachers = teacherRepository.findByIdIn(teacherIds).stream()
                .collect(Collectors.toMap(Teacher::getId, Teacher::getName));

        return researchOpenings.stream()
                .map(opening -> toDto(
                        opening,
                        teachers.getOrDefault(opening.getTeacher().getId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ResearchOpeningDto getTeacherResearchOpeningById(int id) {
        ResearchOpening researchOpening = researchOpeningRepository.findById(id).orElse(null);
        if (researchOpening == null) {
            return null;
        }

        String teacherName = teacherRepository.findById(researchOpening.getTeacher().getId())
                .map(Teacher::getName)
                .orElse("Unknown");

        return toDto(researchOpening, teacherName);
    }

    @Override
    public ResearchOpeningDto createTeacherResearchOpening(ResearchOpeningCreateDto researchOpening) {
        Teacher teacher = teacherRepository.findById(researchOpening.getId())
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found"));

        ResearchOpening model = new ResearchOpening();
        model.setTeacher(teacher);
        model.setTitle(researchOpening.getTitle());
        model.setDescription(researchOpening.getDescription());
        model.setDepartment(researchOpening.getDepartment());
        model.setResearchArea(researchOpening.getResearcharea());
        model.setStipend(researchOpening.getStipend());
        model.setDuration(researchOpening.getDuration());
        model.setPostedDate(researchOpening.getPostedDate());
        model.setDeadline(researchOpening.getDeadLine());
        model.setLink(researchOpening.getLink());
        model.setActive(researchOpening.isActive());

        ResearchOpening saved = researchOpeningRepository.save(model);
        String teacherName = teacher.getName();
        return toDto(saved, teacherName);
    }

    @Override
    public boolean updateTeacherResearchOpening(int id, ResearchOpeningCreateDto researchOpening) {
        ResearchOpening existing = researchOpeningRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        Teacher teacher = teacherRepository.findById(researchOpening.getId()).orElse(null);
        if (teacher == null) {
            return false;
        }

        existing.setTeacher(teacher);
        existing.setTitle(researchOpening.getTitle());
        existing.setDescription(researchOpening.getDescription());
        existing.setDepartment(researchOpening.getDepartment());
        existing.setResearchArea(researchOpening.getResearcharea());
        existing.setStipend(researchOpening.getStipend());
        existing.setDuration(researchOpening.getDuration());
        existing.setPostedDate(researchOpening.getPostedDate());
        existing.setDeadline(researchOpening.getDeadLine());
        existing.setLink(researchOpening.getLink());
        existing.setActive(researchOpening.isActive());
        researchOpeningRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteTeacherResearchOpening(int id) {
        if (!researchOpeningRepository.existsById(id)) {
            return false;
        }
        researchOpeningRepository.deleteById(id);
        return true;
    }

    private ResearchOpeningDto toDto(ResearchOpening opening, String teacherName) {
        ResearchOpeningDto dto = new ResearchOpeningDto();
        dto.setId(opening.getTeacher().getId());
        dto.setTeachername(teacherName);
        dto.setTitle(opening.getTitle());
        dto.setDescription(opening.getDescription());
        dto.setDepartment(opening.getDepartment());
        dto.setResearcharea(opening.getResearchArea());
        dto.setStipend(opening.getStipend());
        dto.setDuration(opening.getDuration());
        dto.setPostedDate(opening.getPostedDate());
        dto.setDeadLine(opening.getDeadline());
        dto.setLink(opening.getLink());
        dto.setActive(Boolean.toString(opening.isActive()).toLowerCase());
        return dto;
    }
}
