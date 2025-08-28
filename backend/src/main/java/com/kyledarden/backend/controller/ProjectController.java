package com.kyledarden.backend.controller;

import com.kyledarden.backend.model.Project;
import com.kyledarden.backend.service.ProjectService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/api/projects")
    public List<Project> getProjects() {
        return projectService.all();
    }
}
