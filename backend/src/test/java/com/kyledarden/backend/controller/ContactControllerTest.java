package com.kyledarden.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private static final String VALID_BODY = """
            {"name":"Ada Lovelace","email":"ada@example.com","message":"Hello!"}
            """;

    private org.springframework.test.web.servlet.RequestBuilder contactPost(String body) {
        return post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body);
    }

    @Test
    void validSubmissionReturns202() throws Exception {
        mockMvc.perform(contactPost(VALID_BODY))
                .andExpect(status().isAccepted());
    }

    @Test
    void blankNameReturns400() throws Exception {
        mockMvc.perform(contactPost(
                """
                {"name":"","email":"ada@example.com","message":"Hello!"}
                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void malformedEmailReturns400() throws Exception {
        mockMvc.perform(contactPost(
                """
                {"name":"Ada","email":"not-an-email","message":"Hello!"}
                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void missingMessageReturns400() throws Exception {
        mockMvc.perform(contactPost(
                """
                {"name":"Ada","email":"ada@example.com"}
                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void oversizedMessageReturns400() throws Exception {
        String oversized = "x".repeat(5001);
        mockMvc.perform(contactPost(
                "{\"name\":\"Ada\",\"email\":\"ada@example.com\",\"message\":\"" + oversized + "\"}"))
                .andExpect(status().isBadRequest());
    }
}
