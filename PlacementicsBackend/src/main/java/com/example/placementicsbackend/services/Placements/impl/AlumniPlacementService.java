package com.example.placementicsbackend.services.placements.impl;

import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningCreateDto;
import com.example.placementicsbackend.dtos.AlumniJobOpenings.AlumniJobOpeningDto;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.enums.PostedByType;
import com.example.placementicsbackend.models.jobopening.AlumniJobOpenings;
import com.example.placementicsbackend.repositories.AlumniJobOpeningsRepository;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.services.placements.interfaces.IAlumniPlacementService;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumniPlacementService implements IAlumniPlacementService {

    private final AlumniJobOpeningsRepository alumniJobOpeningsRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AlumniJobOpeningDto> getAllAlumniJobPositions() {
        List<AlumniJobOpenings> jobs = alumniJobOpeningsRepository.findAll();
        List<String> companyIds = jobs.stream()
                .map(AlumniJobOpenings::getCompanyId)
                .distinct()
                .toList();

        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return jobs.stream()
                .map(job -> toDto(job, companies.getOrDefault(job.getCompanyId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AlumniJobOpeningDto getAlumniPlacementById(int id) {
        AlumniJobOpenings job = alumniJobOpeningsRepository.findById(id).orElse(null);
        if (job == null) {
            return null;
        }

        String companyName = companyRepository.findById(job.getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return toDto(job, companyName);
    }

    @Override
    public boolean createAlumniPlacement(AlumniJobOpeningCreateDto alumniPlacement) {
        AlumniJobOpenings entity = new AlumniJobOpenings();
        entity.setCompanyId(alumniPlacement.getCompanyId());
        entity.setJobTitle(alumniPlacement.getJobTitle());
        entity.setPostedDate(LocalDate.parse(alumniPlacement.getPostedDate()));
        entity.setPackageOffer(alumniPlacement.getPkg());
        entity.setJobUrl(alumniPlacement.getJobUrl());
        entity.setPostedByProfileUrl(alumniPlacement.getPostedByProfileUrl());
        entity.setPostedId(alumniPlacement.getPostedId());
        entity.setPostedBy(alumniPlacement.getPostedBy() != null
                ? alumniPlacement.getPostedBy()
                : PostedByType.Alumni);

        alumniJobOpeningsRepository.save(entity);
        return true;
    }

    @Override
    public boolean updateAlumniPlacement(int id, AlumniJobOpeningCreateDto alumniPlacement) {
        AlumniJobOpenings existing = alumniJobOpeningsRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        existing.setCompanyId(alumniPlacement.getCompanyId());
        existing.setJobTitle(alumniPlacement.getJobTitle());
        existing.setPostedDate(LocalDate.parse(alumniPlacement.getPostedDate()));
        existing.setPackageOffer(alumniPlacement.getPkg());
        existing.setPostedBy(alumniPlacement.getPostedBy() != null
                ? alumniPlacement.getPostedBy()
                : PostedByType.Alumni);
        alumniJobOpeningsRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteAlumniPlacement(int id) {
        if (!alumniJobOpeningsRepository.existsById(id)) {
            return false;
        }
        alumniJobOpeningsRepository.deleteById(id);
        return true;
    }

    private AlumniJobOpeningDto toDto(AlumniJobOpenings job, String companyName) {
        AlumniJobOpeningDto dto = new AlumniJobOpeningDto();
        dto.setCompanyName(companyName);
        dto.setJobTitle(job.getJobTitle());
        dto.setPostedDate(job.getPostedDate().toString());
        dto.setPkg(job.getPackageOffer());
        dto.setJobUrl(job.getJobUrl());
        dto.setPostedByProfileUrl(job.getPostedByProfileUrl());
        return dto;
    }
}
