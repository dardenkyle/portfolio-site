package com.kyledarden.backend.controller;

import com.kyledarden.backend.model.TechItem;
import com.kyledarden.backend.model.Project;
import com.kyledarden.backend.service.TechService;
import com.kyledarden.backend.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TechController {

    private final TechService techService;
    private final ProjectService projectService;

    public TechController(TechService techService, ProjectService projectService) {
        this.techService = techService;
        this.projectService = projectService;
    }

    @GetMapping("/skills")
    public List<TechItem> getAllSkills() {
        return techService.getAllTechItems();
    }

    @GetMapping("/skills/{slug}")
    public ResponseEntity<TechItem> getSkillBySlug(@PathVariable String slug) {
        return techService.getTechItemBySlug(slug)
                .map(techItem -> {
                    // Find projects that use this skill
                    List<Project> allProjects = projectService.all();
                    List<Project> projectsUsingSkill = allProjects.stream()
                            .filter(project -> project.getTechStack() != null && 
                                    project.getTechStack().stream()
                                            .anyMatch(tech -> tech.getId().equals(slug)))
                            .toList();
                    
                    // Update the tech item with actual projects
                    techItem.setProjects(projectsUsingSkill);
                    return ResponseEntity.ok(techItem);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}