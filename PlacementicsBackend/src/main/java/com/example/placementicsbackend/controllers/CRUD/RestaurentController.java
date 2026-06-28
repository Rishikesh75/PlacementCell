package com.example.placementicsbackend.controllers.CRUD;

import com.placementcellbackend.models.Restaurents;
import com.placementcellbackend.services.crud.interfaces.IRestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
@RequiredArgsConstructor
public class RestaurantController {

    private final IRestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<List<Restaurents>> getAllRestaurants() {

        List<Restaurents> restaurants =
                restaurantService.getAllRestaurants();

        return ResponseEntity.ok(restaurants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurents> getRestaurantById(
            @PathVariable Integer id) {

        Restaurents restaurant =
                restaurantService.getRestaurantById(id);

        if (restaurant == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(restaurant);
    }

    @PostMapping
    public ResponseEntity<Restaurents> createRestaurant(
            @RequestBody Restaurents restaurant) {

        Restaurents created =
                restaurantService.createRestaurant(restaurant);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateRestaurant(
            @PathVariable Integer id,
            @RequestBody Restaurents restaurant) {

        if (!id.equals(restaurant.getId())) {
            return ResponseEntity.badRequest().build();
        }

        boolean success =
                restaurantService.updateRestaurant(id, restaurant);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(
            @PathVariable Integer id) {

        boolean success =
                restaurantService.deleteRestaurant(id);

        if (!success) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}