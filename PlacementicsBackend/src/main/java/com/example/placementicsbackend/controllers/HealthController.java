package com.example.placementicsbackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {

    private final DataSource dataSource;
    private final MongoTemplate mongoTemplate;

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> postgres = checkPostgres();
        Map<String, Object> mongodb = checkMongo();

        boolean up = "UP".equals(postgres.get("status")) && "UP".equals(mongodb.get("status"));

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", up ? "UP" : "DOWN");
        body.put("postgres", postgres);
        body.put("mongodb", mongodb);

        return ResponseEntity.status(up ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE).body(body);
    }

    private Map<String, Object> checkPostgres() {
        Map<String, Object> result = new LinkedHashMap<>();
        try (Connection connection = dataSource.getConnection()) {
            result.put("status", connection.isValid(3) ? "UP" : "DOWN");
            result.put("database", connection.getCatalog());
        } catch (Exception ex) {
            result.put("status", "DOWN");
            result.put("error", ex.getMessage());
        }
        return result;
    }

    private Map<String, Object> checkMongo() {
        Map<String, Object> result = new LinkedHashMap<>();
        try {
            mongoTemplate.executeCommand("{ ping: 1 }");
            result.put("status", "UP");
            result.put("database", mongoTemplate.getDb().getName());
        } catch (Exception ex) {
            result.put("status", "DOWN");
            result.put("error", ex.getMessage());
        }
        return result;
    }
}
