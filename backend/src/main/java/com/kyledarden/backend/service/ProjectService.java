// backend/src/main/java/com/kyledarden/backend/service/ProjectService.java
package com.kyledarden.backend.service;

import com.kyledarden.backend.model.Project;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class ProjectService {

    // Seed data; pass null for optional fields you don't have.
    // Order is used for sorting in the grid (lower = earlier).
    private final List<Project> projects = List.of(
        new Project(
            "cs2-analytics",
            "CS2 Analytics Platform",
            "Queue-based scraping, PostgreSQL storage, analytics API.",
            List.of("Java", "Spring Boot", "PostgreSQL"),
            "https://github.com/youruser/cs2-analytics",  // repoUrl
            null,                                         // liveUrl
            20,                                           // order
            OffsetDateTime.parse("2024-10-01T00:00:00Z"), // updatedAt (ISO 8601) or null
            null,                                         // heroImage
            null                                          // videoId
        ),
        new Project(
            "freightfolio",
            "FreightFolio (Logistics SaaS)",
            "Load manager, invoices, AR/AP; AWS-ready.",
            List.of("Java", "Spring Boot", "AWS"),
            "https://github.com/youruser/freightfolio",
            "https://demo.example",
            10,
            null,
            null,
            null
        )
    );

    public List<Project> all() {
        return projects;
    }

    // Optional (useful soon for /api/projects/{slug})
    public Project getBySlug(String slug) {
        return projects.stream()
            .filter(p -> p.getSlug().equalsIgnoreCase(slug))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }
}
