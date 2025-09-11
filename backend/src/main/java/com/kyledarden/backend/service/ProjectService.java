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
            "Open-source, modular backend data pipeline designed to scrape, parse, and analyze professional Counter-Strike 2 (CS2) match data",
            List.of("Python", "SQL", "PostgreSQL"),
            "https://github.com/dardenkyle/CS2-analytics",  // repoUrl
            null,                                         // liveUrl
            20,                                           // order
            OffsetDateTime.parse("2024-10-01T00:00:00Z"), // updatedAt (ISO 8601) or null
            null,                                         // heroImage
            null,                                         // videoId
            "Test",                                         // overview
            List.of(
                new Project.TechItem("python", "Python", "Language", "https://www.python.org", 1),
                new Project.TechItem("fastapi", "FastAPI", "Backend", "https://fastapi.tiangolo.com", 2),
                new Project.TechItem("postgres", "PostgreSQL", "Database", "https://www.postgresql.org", 3)
            ),                                         // techStack
            List.of(
                new Project.Challenge(
                    "rate-limits",
                    "Handling scrape rate limits reliably",
                    "Long-running scraping against external endpoints needs to be resilient to throttling and transient failures.",
                    "Queue workers with exponential backoff + jitter; idempotent upserts keyed by match id; resumable runs.",
                    "Stable runs with near-zero duplicates and recoverability after failures.",
                    List.of(
                        new Project.Link("Design notes", "https://example.com/cs2-scraper-notes")
                    ),
                    List.of("scraping", "queues", "resilience"),
                    1
                )            // challenges
            )
        ),
        new Project(
            "freightfolio",
            "FreightFolio (Logistics SaaS)",
            "Private, production-grade SaaS backend designed for small freight carriers. It provides a modular, scalable system to streamline logistics operations through microservices, focusing on load management, invoicing, and secure user authentication.",
            List.of("Python", "FastAPI", "AWS"),
            "https://github.com/dardenkyle/freightfolio-overview",
            null,
            10,
            null,
            null,
            null,
            null,                                         // overview
            null,                                         // techStack
            null                                      // challenges
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
