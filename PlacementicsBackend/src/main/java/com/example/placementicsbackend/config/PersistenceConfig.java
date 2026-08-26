package com.example.placementicsbackend.config;

import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EntityScan(basePackages = "com.example.placementicsbackend.models")
@EnableJpaRepositories(basePackages = "com.example.placementicsbackend.repositories.jpa")
@EnableMongoRepositories(basePackages = "com.example.placementicsbackend.repositories.mongo")
public class PersistenceConfig {
}
