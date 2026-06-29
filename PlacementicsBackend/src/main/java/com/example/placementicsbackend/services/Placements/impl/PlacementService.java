package com.example.placementicsbackend.services.Placements.impl;

import com.example.placementicsbackend.dtos.PlacementDTOs.CreatePlacementDto;
import com.example.placementicsbackend.dtos.PlacementDTOs.PlacementDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.Placement;
import com.example.placementicsbackend.models.Student;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.repositories.PlacementRepository;
import com.example.placementicsbackend.repositories.StudentRepository;
import com.example.placementicsbackend.services.Placements.Interfaces.IPlacementService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PlacementService implements IPlacementService {

    private final PlacementRepository placementRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<PlacementDto> getAllPlacements() {
        List<Placement> placements = placementRepository.findAll();
        if (placements.isEmpty()) {
            return List.of();
        }

        List<String> studentIds = placements.stream()
                .map(p -> p.getStudent().getId())
                .distinct()
                .toList();
        Map<String, String> students = studentRepository.findByIdIn(studentIds).stream()
                .collect(Collectors.toMap(Student::getId, Student::getName));

        List<String> companyIds = placements.stream()
                .map(p -> p.getCompany().getCompanyId())
                .distinct()
                .toList();
        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return placements.stream()
                .map(p -> toDto(
                        p,
                        students.getOrDefault(p.getStudent().getId(), "Unknown"),
                        companies.getOrDefault(p.getCompany().getCompanyId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PlacementDto getPlacementById(int id) {
        Placement placement = placementRepository.findById(id).orElse(null);
        if (placement == null) {
            return null;
        }

        String studentName = studentRepository.findById(placement.getStudent().getId())
                .map(Student::getName)
                .orElse("Unknown");
        String companyName = companyRepository.findById(placement.getCompany().getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return toDto(placement, studentName, companyName);
    }

    @Override
    public Placement createPlacement(CreatePlacementDto placement) {
        Student student = studentRepository.findById(placement.getId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        Company company = companyRepository.findById(placement.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        Placement placementModel = new Placement();
        placementModel.setStudent(student);
        placementModel.setCompany(company);
        placementModel.setJobTitle(placement.getJobTitle());
        placementModel.setPlacementDate(placement.getPlacementDate());
        placementModel.setPackageOffer(placement.getPkg());

        return placementRepository.save(placementModel);
    }

    @Override
    public boolean updatePlacement(int id, CreatePlacementDto placement) {
        Placement existing = placementRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        Student student = studentRepository.findById(placement.getId()).orElse(null);
        Company company = companyRepository.findById(placement.getCompanyId()).orElse(null);
        if (student == null || company == null) {
            return false;
        }

        existing.setStudent(student);
        existing.setCompany(company);
        existing.setJobTitle(placement.getJobTitle());
        existing.setPlacementDate(placement.getPlacementDate());
        existing.setPackageOffer(placement.getPkg());
        placementRepository.save(existing);
        return true;
    }

    @Override
    public boolean deletePlacement(int id) {
        if (!placementRepository.existsById(id)) {
            return false;
        }
        placementRepository.deleteById(id);
        return true;
    }

    private PlacementDto toDto(Placement placement, String studentName, String companyName) {
        PlacementDto dto = new PlacementDto();
        dto.setId(placement.getStudent().getId());
        dto.setStudentName(studentName);
        dto.setCompanyId(placement.getCompany().getCompanyId());
        dto.setCompanyName(companyName);
        dto.setJobTitle(placement.getJobTitle());
        dto.setPlacementDate(placement.getPlacementDate());
        dto.setPkg(placement.getPackageOffer());
        return dto;
    }
}
