package com.example.placementicsbackend.repositories;

import com.example.placementicsbackend.models.Restaurents;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurentsRepository extends JpaRepository<Restaurents, Integer> {

    List<Restaurents> findByIdIn(List<Integer> ids);
}
