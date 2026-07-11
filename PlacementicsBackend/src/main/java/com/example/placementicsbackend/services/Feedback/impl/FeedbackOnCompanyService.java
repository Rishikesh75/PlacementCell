package com.example.placementicsbackend.services.Feedback.impl;
import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyCreateDto;
import com.example.placementicsbackend.dtos.AlumniFeedBackOnCompanyDTO;
import com.example.placementicsbackend.models.Alumni;
import com.example.placementicsbackend.models.Company;
import com.example.placementicsbackend.models.FeedBacks.AlumniFeedBackonCompany;
import com.example.placementicsbackend.repositories.AlumniFeedBackonCompanyRepository;
import com.example.placementicsbackend.repositories.AlumniRepository;
import com.example.placementicsbackend.repositories.CompanyRepository;
import com.example.placementicsbackend.services.Feedback.Interfaces.IFeedbackOnCompanyService;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FeedbackOnCompanyService implements IFeedbackOnCompanyService {

    private final AlumniFeedBackonCompanyRepository alumniFeedBackonCompanyRepository;
    private final CompanyRepository companyRepository;
    private final AlumniRepository alumniRepository;

    @Override
    @Transactional(readOnly = true)
    public List<AlumniFeedBackOnCompanyDTO> getAllFeedbacks() {
        List<AlumniFeedBackonCompany> feedbacks = alumniFeedBackonCompanyRepository.findAll();
        if (feedbacks.isEmpty()) {
            return List.of();
        }

        List<String> companyIds = feedbacks.stream()
                .map(feedback -> feedback.getCompany().getCompanyId())
                .distinct()
                .toList();
        Map<String, String> companies = companyRepository.findByCompanyIdIn(companyIds).stream()
                .collect(Collectors.toMap(Company::getCompanyId, Company::getCompanyName));

        List<String> alumniIds = feedbacks.stream()
                .map(AlumniFeedBackonCompany::getAlumniId)
                .distinct()
                .toList();
        Map<String, String> alumniProfiles = alumniRepository.findByIdIn(alumniIds).stream()
                .collect(Collectors.toMap(
                        Alumni::getId,
                        alumni -> alumni.getLinkedinProfile() != null ? alumni.getLinkedinProfile() : ""));

        return feedbacks.stream()
                .map(feedback -> toDto(
                        feedback,
                        companies.getOrDefault(feedback.getCompany().getCompanyId(), "Unknown"),
                        alumniProfiles.getOrDefault(feedback.getAlumniId(), "")))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AlumniFeedBackOnCompanyDTO getFeedbackById(String id) {
        AlumniFeedBackonCompany feedback = alumniFeedBackonCompanyRepository.findById(id).orElse(null);
        if (feedback == null) {
            return null;
        }

        String companyName = companyRepository.findById(feedback.getCompany().getCompanyId())
                .map(Company::getCompanyName)
                .orElse("Unknown");
        String alumniProfile = alumniRepository.findById(feedback.getAlumniId())
                .map(Alumni::getLinkedinProfile)
                .orElse("");

        return toDto(feedback, companyName, alumniProfile != null ? alumniProfile : "");
    }

    @Override
    public AlumniFeedBackOnCompanyDTO createFeedback(AlumniFeedbackOnCompanyCreateDto feedback) {
        Alumni alumni = alumniRepository.findById(feedback.getId())
                .orElseThrow(() -> new IllegalArgumentException("Alumni not found"));
        Company company = companyRepository.findById(feedback.getCompanyId())
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        AlumniFeedBackonCompany feedbackModel = new AlumniFeedBackonCompany();
        feedbackModel.setId(feedback.getId());
        feedbackModel.setAlumni(alumni);
        feedbackModel.setAlumniId(feedback.getId());
        feedbackModel.setCompany(company);
        feedbackModel.setJobProfile(feedback.getJobProfile());
        feedbackModel.setCtc(feedback.getCtc());
        feedbackModel.setJobLocation(feedback.getJobLocation());
        feedbackModel.setJobType(feedback.getJobType());
        feedbackModel.setWorkMode(feedback.getWorkMode());
        feedbackModel.setCodingRoundInfo(feedback.getCodingRoundInfo());
        feedbackModel.setTechnicalRoundInfo(feedback.getTechnicalRoundInfo());
        feedbackModel.setHrRoundInfo(feedback.getHrRoundInfo());
        feedbackModel.setResourcesInfo(feedback.getResourcesInfo());

        AlumniFeedBackonCompany saved = alumniFeedBackonCompanyRepository.save(feedbackModel);
        return toDto(saved, company.getCompanyName(), alumni.getLinkedinProfile());
    }

    @Override
    public boolean updateFeedback(int id, AlumniFeedbackOnCompanyCreateDto feedback) {
        AlumniFeedBackonCompany existing = alumniFeedBackonCompanyRepository.findById(String.valueOf(id)).orElse(null);
        if (existing == null) {
            return false;
        }

        Company company = companyRepository.findById(feedback.getCompanyId()).orElse(null);
        Alumni alumni = alumniRepository.findById(feedback.getId()).orElse(null);
        if (company == null || alumni == null) {
            return false;
        }

        existing.setId(feedback.getId());
        existing.setAlumni(alumni);
        existing.setAlumniId(feedback.getId());
        existing.setCompany(company);
        existing.setJobProfile(feedback.getJobProfile());
        existing.setCtc(feedback.getCtc());
        existing.setJobLocation(feedback.getJobLocation());
        existing.setJobType(feedback.getJobType());
        existing.setWorkMode(feedback.getWorkMode());
        existing.setCodingRoundInfo(feedback.getCodingRoundInfo());
        existing.setTechnicalRoundInfo(feedback.getTechnicalRoundInfo());
        existing.setHrRoundInfo(feedback.getHrRoundInfo());
        existing.setResourcesInfo(feedback.getResourcesInfo());
        alumniFeedBackonCompanyRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteFeedback(int id) {
        String feedbackId = String.valueOf(id);
        if (!alumniFeedBackonCompanyRepository.existsById(feedbackId)) {
            return false;
        }
        alumniFeedBackonCompanyRepository.deleteById(feedbackId);
        return true;
    }

    private AlumniFeedBackOnCompanyDTO toDto(
            AlumniFeedBackonCompany feedback,
            String companyName,
            String alumniProfile) {
        AlumniFeedBackOnCompanyDTO dto = new AlumniFeedBackOnCompanyDTO();
        dto.setCompanyName(companyName);
        dto.setAlumniProfile(alumniProfile);
        dto.setJobProfile(feedback.getJobProfile());
        dto.setCtc(feedback.getCtc());
        dto.setJobLocation(feedback.getJobLocation());
        dto.setJobType(feedback.getJobType());
        dto.setWorkMode(feedback.getWorkMode());
        dto.setCodingRoundInfo(feedback.getCodingRoundInfo());
        dto.setTechnicalRoundInfo(feedback.getTechnicalRoundInfo());
        dto.setHrRoundInfo(feedback.getHrRoundInfo());
        dto.setResourcesInfo(feedback.getResourcesInfo());
        return dto;
    }
}
