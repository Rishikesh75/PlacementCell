package com.example.placementicsbackend.services.feedback.interfaces;

import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyCreateDto;
import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyDto;
import java.util.List;

public interface IFeedbackOnCompanyService {

    List<AlumniFeedbackOnCompanyDto> getAllFeedbacks();

    AlumniFeedbackOnCompanyDto getFeedbackById(String id);

    AlumniFeedbackOnCompanyDto createFeedback(AlumniFeedbackOnCompanyCreateDto feedback);

    boolean updateFeedback(int id, AlumniFeedbackOnCompanyCreateDto feedback);

    boolean deleteFeedback(int id);
}
