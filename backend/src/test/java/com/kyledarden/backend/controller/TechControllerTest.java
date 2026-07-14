package com.kyledarden.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.blankOrNullString;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TechControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void skillsReturnsNonEmptyList() throws Exception {
        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThan(0))));
    }

    @Test
    void everySkillHasCoreDisplayFields() throws Exception {
        mockMvc.perform(get("/api/skills"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].slug", everyItem(not(blankOrNullString()))))
                .andExpect(jsonPath("$[*].name", everyItem(not(blankOrNullString()))))
                .andExpect(jsonPath("$[*].category", everyItem(not(blankOrNullString()))))
                .andExpect(jsonPath("$[*].description", everyItem(not(blankOrNullString()))));
    }

    @Test
    void knownSkillSlugReturnsItemWithProjects() throws Exception {
        mockMvc.perform(get("/api/skills/python"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("python"))
                .andExpect(jsonPath("$.projects", hasSize(greaterThan(0))));
    }

    @Test
    void unknownSkillSlugReturns404() throws Exception {
        mockMvc.perform(get("/api/skills/definitely-not-a-skill"))
                .andExpect(status().isNotFound());
    }
}
