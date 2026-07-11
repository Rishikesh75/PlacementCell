package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.models.Restaurents;
import com.example.placementicsbackend.services.Interfaces.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
public class RestaurentController {

    private final IRestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurents>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurents> getRestaurantById(@PathVariable Integer id) {
        Restaurents restaurant = restaurantService.getRestaurantById(id);
        if (restaurant == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(restaurant);
    }

    @PostMapping
    public ResponseEntity<Restaurents> createRestaurant(@RequestBody Restaurents restaurant) {
        Restaurents created = restaurantService.createRestaurant(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRestaurant(@PathVariable Integer id, @RequestBody Restaurents restaurant) {
        if (!id.equals(restaurant.getId())) {
            return ResponseEntity.badRequest().build();
        }
        if (!restaurantService.updateRestaurant(id, restaurant)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Integer id) {
        if (!restaurantService.deleteRestaurant(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}
