package com.kyledarden.backend.service;

import com.kyledarden.backend.model.Project;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Every project tech reference must resolve against TechService. A dangling
 * slug otherwise surfaces only at request time as a 500 on /api/projects,
 * which has nearly shipped before when removing skill entries.
 */
@SpringBootTest
class ProjectTechReferenceIntegrityTest {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TechService techService;

    @Test
    void everyProjectTechReferenceResolvesToAKnownSkill() {
        List<Project> projects = projectService.all();
        assertThat(projects).isNotEmpty();

        for (Project project : projects) {
            for (Project.TechItem tech : project.getTechStack()) {
                assertThat(techService.getTechItemBySlug(tech.getId()))
                        .withFailMessage(
                                "Project '%s' references tech slug '%s', which does not exist in TechService",
                                project.getSlug(), tech.getId())
                        .isPresent();
            }
        }
    }
}
