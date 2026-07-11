package com.example.placementicsbackend.services.Interfaces;

import com.example.placementicsbackend.models.Restaurents;
import java.util.List;

public interface IRestaurantService {

    List<Restaurents> getAllRestaurants();

    Restaurents getRestaurantById(int id);

    Restaurents createRestaurant(Restaurents restaurant);

    boolean updateRestaurant(int id, Restaurents restaurant);

    boolean deleteRestaurant(int id);
}
