package com.kyledarden.backend.service;

import com.kyledarden.backend.model.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

/**
 * Every project tech reference must resolve against TechService.
 * ProjectService resolves references lazily and throws on the first
 * dangling slug (naming it in the exception message), so without this
 * test a bad reference surfaces only at request time as a 500 on
 * /api/projects - which has nearly shipped before when removing skills.
 */
@SpringBootTest
class ProjectTechReferenceIntegrityTest {

    @Autowired
    private ProjectService projectService;

    @Test
    void everyProjectTechReferenceResolvesToAKnownSkill() {
        List<Project> projects = assertDoesNotThrow(
                projectService::all,
                "A project references a tech slug missing from TechService;"
                        + " the cause names the dangling slug");
        assertThat(projects).isNotEmpty();
    }
}
