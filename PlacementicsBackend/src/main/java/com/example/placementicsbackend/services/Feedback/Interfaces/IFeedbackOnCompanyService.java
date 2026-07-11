package com.example.placementicsbackend.services.Feedback.Interfaces;

import com.example.placementicsbackend.dtos.AlumniFeedbackOnCompanyCreateDto;
import com.example.placementicsbackend.dtos.AlumniFeedBackOnCompanyDTO;
import java.util.List;

public interface IFeedbackOnCompanyService {

    List<AlumniFeedBackOnCompanyDTO> getAllFeedbacks();

    AlumniFeedBackOnCompanyDTO getFeedbackById(String id);

    AlumniFeedBackOnCompanyDTO createFeedback(AlumniFeedbackOnCompanyCreateDto feedback);

    boolean updateFeedback(int id, AlumniFeedbackOnCompanyCreateDto feedback);

    boolean deleteFeedback(int id);
}
