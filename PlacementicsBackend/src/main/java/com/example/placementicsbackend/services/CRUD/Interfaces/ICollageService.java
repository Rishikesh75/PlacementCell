package com.example.placementicsbackend.services.crud.interfaces;

import com.example.placementicsbackend.models.College;
import java.util.List;

public interface ICollageService {

    List<College> getAllColleges();

    College getCollegeById(int id);

    College createCollege(College college);

    boolean updateCollege(int id, College college);

    boolean deleteCollege(int id);
}
