
package com.example.placementicsbackend.controllers;

import com.example.placementicsbackend.config.SecurityConfig;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.sql.SQLException;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HealthController.class)
@Import({
        SecurityConfig.class,
        HealthControllerSecurityTest.SecurityTestConfiguration.class
})
class HealthControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DataSource dataSource;

    @MockitoBean
    private MongoTemplate mongoTemplate;

    @TestConfiguration
    @EnableWebSecurity
    static class SecurityTestConfiguration {
    }

    @Test
    void anonymousUserCanAccessHealthEndpointAndSeeDatabaseException()
            throws Exception {

        String simulatedError =
                "Connection to db.internal.example:5432 failed";

        when(dataSource.getConnection())
                .thenThrow(new SQLException(simulatedError));

        MongoDatabase database = mock(MongoDatabase.class);

        when(mongoTemplate.executeCommand("{ ping: 1 }"))
                .thenReturn(new Document("ok", 1));

        when(mongoTemplate.getDb()).thenReturn(database);
        when(database.getName()).thenReturn("test_mongodb");

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isServiceUnavailable())
                .andExpect(jsonPath("$.status").value("DOWN"))
                .andExpect(jsonPath("$.postgres.error").value(simulatedError))
                .andExpect(jsonPath("$.mongodb.status").value("UP"));
    }
    @Test
void anonymousUserCanAccessHealthEndpointAndSeeMongoException()
        throws Exception {

    String simulatedError =
            "Mongo connection failed at mongo.internal.example:27017";

    when(dataSource.getConnection()).thenAnswer(invocation -> {
        var connection = mock(java.sql.Connection.class);
        when(connection.isValid(3)).thenReturn(true);
        when(connection.getCatalog()).thenReturn("test_postgres");
        return connection;
    });

    when(mongoTemplate.executeCommand("{ ping: 1 }"))
            .thenThrow(new RuntimeException(simulatedError));

    mockMvc.perform(get("/api/health"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(jsonPath("$.status").value("DOWN"))
            .andExpect(jsonPath("$.postgres.status").value("UP"))
            .andExpect(jsonPath("$.mongodb.error").value(simulatedError));
}
}
