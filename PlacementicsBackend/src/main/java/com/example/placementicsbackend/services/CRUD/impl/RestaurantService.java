package com.example.placementicsbackend.services.crud.impl;

import com.example.placementicsbackend.models.Restaurents;
import com.example.placementicsbackend.repositories.RestaurentsRepository;
import com.example.placementicsbackend.services.crud.interfaces.IRestaurantService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RestaurantService implements IRestaurantService {

    private final RestaurentsRepository restaurentsRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Restaurents> getAllRestaurants() {
        return restaurentsRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Restaurents getRestaurantById(int id) {
        return restaurentsRepository.findById(id).orElse(null);
    }

    @Override
    public Restaurents createRestaurant(Restaurents restaurant) {
        return restaurentsRepository.save(restaurant);
    }

    @Override
    public boolean updateRestaurant(int id, Restaurents restaurant) {
        Restaurents existing = restaurentsRepository.findById(id).orElse(null);
        if (existing == null) {
            return false;
        }

        existing.setName(restaurant.getName());
        existing.setContact(restaurant.getContact());
        existing.setAddress(restaurant.getAddress());
        existing.setRating(restaurant.getRating());
        restaurentsRepository.save(existing);
        return true;
    }

    @Override
    public boolean deleteRestaurant(int id) {
        if (!restaurentsRepository.existsById(id)) {
            return false;
        }
        restaurentsRepository.deleteById(id);
        return true;
    }
}
