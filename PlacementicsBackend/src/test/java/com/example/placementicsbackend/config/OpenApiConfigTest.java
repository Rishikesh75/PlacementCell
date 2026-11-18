package com.example.placementicsbackend.config;

import io.swagger.v3.core.util.Json;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class OpenApiConfigTest {

    @Test
    void declaresPublicApiWithoutSecurityRequirements() throws Exception {
        String specification = Json.mapper()
                .writeValueAsString(new OpenApiConfig().openAPI());

        assertTrue(Json.mapper().readTree(specification).has("security"));
        assertTrue(Json.mapper().readTree(specification).get("security").isEmpty());
    }
}
