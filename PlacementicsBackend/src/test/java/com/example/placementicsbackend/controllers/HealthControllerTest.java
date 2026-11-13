
package com.example.placementicsbackend.controllers;

import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

@WebMvcTest(HealthController.class)
@AutoConfigureMockMvc(addFilters = false)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private DataSource dataSource;

    @MockitoBean
    private MongoTemplate mongoTemplate;

    private void mockPostgresUp() throws SQLException {
        Connection connection = mock(Connection.class);

        when(dataSource.getConnection()).thenReturn(connection);
        when(connection.isValid(3)).thenReturn(true);
        when(connection.getCatalog()).thenReturn("test_postgres");
    }

    private void mockMongoUp() {
        MongoDatabase database = mock(MongoDatabase.class);

        when(mongoTemplate.executeCommand("{ ping: 1 }"))
                .thenReturn(new Document("ok", 1));

        when(mongoTemplate.getDb()).thenReturn(database);
        when(database.getName()).thenReturn("test_mongodb");
    }

    // @Test
    // void healthReturnsUpWhenBothDatabasesAreAvailable() throws Exception {
    //     mockPostgresUp();
    //     mockMongoUp();

    //     mockMvc.perform(get("/api/health"))
    //             .andExpect(status().isOk())
    //             .andExpect(content().contentTypeCompatibleWith("application/json"))
    //             .andExpect(jsonPath("$.status").value("UP"))
    //             .andExpect(jsonPath("$.postgres.status").value("UP"))
    //             .andExpect(jsonPath("$.mongodb.status").value("UP"));
    // }

    // @Test
    // void healthReturns503WhenPostgresIsUnavailable() throws Exception {
    //     when(dataSource.getConnection())
    //             .thenThrow(new SQLException("PostgreSQL unavailable"));

    //     mockMongoUp();

    //     mockMvc.perform(get("/api/health"))
    //             .andExpect(status().isServiceUnavailable())
    //             .andExpect(jsonPath("$.status").value("DOWN"))
    //             .andExpect(jsonPath("$.postgres.status").value("DOWN"))
    //             .andExpect(jsonPath("$.mongodb.status").value("UP"));
    // }

@Test
void healthExposesRawPostgresExceptionMessage() throws Exception {
    String simulatedError =
            "Connection to db.internal.example:5432 failed for user placement_app";

    when(dataSource.getConnection())
            .thenThrow(new SQLException(simulatedError));

    mockMongoUp();

    mockMvc.perform(get("/api/health"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(jsonPath("$.status").value("DOWN"))
            .andExpect(jsonPath("$.postgres.status").value("DOWN"))
            .andExpect(jsonPath("$.postgres.error").value(simulatedError))
            .andExpect(jsonPath("$.mongodb.status").value("UP"));
}


@Test
void healthExposesRawMongoExceptionMessage() throws Exception {
    mockPostgresUp();

    String simulatedError =
            "Mongo success";

    when(mongoTemplate.executeCommand("{ ping: 1 }"))
            .thenThrow(new RuntimeException(simulatedError));

    mockMvc.perform(get("/api/health"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(jsonPath("$.status").value("DOWN"))
            .andExpect(jsonPath("$.postgres.status").value("UP"))
            .andExpect(jsonPath("$.mongodb.status").value("DOWN"))
            .andExpect(jsonPath("$.mongodb.error").value(simulatedError));
}

    // @Test
    // void healthReturns503WhenMongoIsUnavailable() throws Exception {
    //     mockPostgresUp();

    //     when(mongoTemplate.executeCommand("{ ping: 1 }"))
    //             .thenThrow(new RuntimeException("MongoDB unavailable"));

    //     mockMvc.perform(get("/api/health"))
    //             .andExpect(status().isServiceUnavailable())
    //             .andExpect(jsonPath("$.status").value("DOWN"))
    //             .andExpect(jsonPath("$.postgres.status").value("UP"))
    //             .andExpect(jsonPath("$.mongodb.status").value("DOWN"));
    // }

    // @Test
    // void healthReturns503WhenBothDatabasesAreUnavailable() throws Exception {
    //     when(dataSource.getConnection())
    //             .thenThrow(new SQLException("PostgreSQL unavailable"));

    //     when(mongoTemplate.executeCommand("{ ping: 1 }"))
    //             .thenThrow(new RuntimeException("MongoDB unavailable"));

    //     mockMvc.perform(get("/api/health"))
    //             .andExpect(status().isServiceUnavailable())
    //             .andExpect(jsonPath("$.status").value("DOWN"))
    //             .andExpect(jsonPath("$.postgres.status").value("DOWN"))
    //             .andExpect(jsonPath("$.mongodb.status").value("DOWN"));
    // }

    // @Test
    // void postRequestReturns405MethodNotAllowed() throws Exception {
    //     mockMvc.perform(post("/api/health"))
    //             .andExpect(status().isMethodNotAllowed());
    // }

    // @Test
    // void healthEndpointAcceptsQueryParameters() throws Exception {
    //     mockPostgresUp();
    //     mockMongoUp();

    //     mockMvc.perform(get("/api/health").param("check", "1"))
    //             .andExpect(status().isOk())
    //             .andExpect(jsonPath("$.status").value("UP"));
    // }

}
