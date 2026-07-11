package com.example.placementicsbackend.services.impl;

import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDto;
import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDtoUpdate;
import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.repositories.AlumniRepository;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.services.Interfaces.IAlumniService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AlumniService implements IAlumniService {

    private final AlumniRepository alumniRepository;
    private final CompanyRepository companyRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AlumniDto> getAllAlumni() {
        List<Alumni> alumni = alumniRepository.findAll();
        List<String> companyIds = alumni.stream()
                .map(Alumni::getCompanyId)
                .distinct()
                .toList();

        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        return alumni.stream()
                .map(a -> toDto(a, companies.getOrDefault(a.getCompanyId(), "Unknown")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AlumniDto getAlumniByIdWithCompany(String id) {
        Alumni alumni = alumniRepository.findById(id).orElse(null);
        if (alumni == null) {
            return null;
        }

        String companyName = companyRepository.findById(alumni.getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");

        return toDto(alumni, companyName);
    }

    @Override
    @Transactional(readOnly = true)
    public Alumni getAlumniById(String id) {
        return alumniRepository.findById(id).orElse(null);
    }

    @Override
    public Alumni createAlumni(Alumni alumni) {
        return alumniRepository.save(alumni);
    }

    @Override
    public boolean updateAlumni(String id, AlumniDtoUpdate alumni) {
        Alumni existingAlumni = alumniRepository.findById(id).orElse(null);
        if (existingAlumni == null) {
            return false;
        }

        existingAlumni.setPosition(alumni.getPosition());
        existingAlumni.setLinkedinProfile(alumni.getLinkedInProfile());
        existingAlumni.setCompanyId(alumni.getCompanyId());
        existingAlumni.setName(alumni.getName());
        alumniRepository.save(existingAlumni);
        return true;
    }

    @Override
    public boolean deleteAlumni(String id) {
        if (!alumniRepository.existsById(id)) {
            return false;
        }
        alumniRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean alumniExists(String id) {
        return alumniRepository.existsById(id);
    }

    private AlumniDto toDto(Alumni alumni, String companyName) {
        AlumniDto dto = new AlumniDto();
        dto.setId(alumni.getId());
        dto.setName(alumni.getName());
        dto.setPosition(alumni.getPosition());
        dto.setLinkedInProfile(alumni.getLinkedinProfile());
        dto.setCompanyId(alumni.getCompanyId());
        dto.setCompanyName(companyName);
        return dto;
    }
}
