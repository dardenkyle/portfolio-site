package com.kyledarden.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Pins the CORS policy in application.properties and CorsConfig: three
 * allowed origins, GET/OPTIONS only. POST /api/contact is intentionally
 * not callable cross-origin from the browser (see CLAUDE.md); if that
 * policy changes deliberately, update these tests with it.
 */
@SpringBootTest
@AutoConfigureMockMvc
class CorsConfigTest {

    private static final String PROD_ORIGIN = "https://kyledarden.com";
    private static final String WWW_ORIGIN = "https://www.kyledarden.com";
    private static final String DEV_ORIGIN = "http://localhost:5173";
    private static final String EVIL_ORIGIN = "https://evil.example";

    @Autowired
    private MockMvc mockMvc;

    @Test
    void allowedOriginsCanPreflightGet() throws Exception {
        for (String origin : new String[] { PROD_ORIGIN, WWW_ORIGIN, DEV_ORIGIN }) {
            mockMvc.perform(options("/api/projects")
                    .header(HttpHeaders.ORIGIN, origin)
                    .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "GET"))
                    .andExpect(status().isOk())
                    .andExpect(header().string(
                            HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origin));
        }
    }

    @Test
    void unknownOriginIsRejected() throws Exception {
        mockMvc.perform(options("/api/projects")
                .header(HttpHeaders.ORIGIN, EVIL_ORIGIN)
                .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "GET"))
                .andExpect(status().isForbidden());
    }

    @Test
    void crossOriginGetCarriesAllowOriginHeader() throws Exception {
        mockMvc.perform(get("/api/health")
                .header(HttpHeaders.ORIGIN, PROD_ORIGIN))
                .andExpect(status().isOk())
                .andExpect(header().string(
                        HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, PROD_ORIGIN));
    }

    @Test
    void preflightForPostIsRejectedEvenFromAllowedOrigin() throws Exception {
        mockMvc.perform(options("/api/contact")
                .header(HttpHeaders.ORIGIN, PROD_ORIGIN)
                .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "POST"))
                .andExpect(status().isForbidden());
    }
}
