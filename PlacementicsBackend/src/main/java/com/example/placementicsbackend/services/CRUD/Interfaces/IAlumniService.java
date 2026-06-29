package com.example.placementicsbackend.services.CRUD.Interfaces;

import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDto;
import com.example.placementicsbackend.dtos.AlumniDtos.AlumniDtoUpdate;
import com.example.placementicsbackend.models.Alumni;
import java.util.List;

public interface IAlumniService {

    List<AlumniDto> getAllAlumni();

    AlumniDto getAlumniByIdWithCompany(String id);

    Alumni getAlumniById(String id);

    Alumni createAlumni(Alumni alumni);

    boolean updateAlumni(String id, AlumniDtoUpdate alumni);

    boolean deleteAlumni(String id);

    boolean alumniExists(String id);
}
