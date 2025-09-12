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
            "Queue-based backend that scrapes and normalizes CS2 match data into a queryable Postgres schema.",
            List.of("Scraping", "Queues", "Idempotency", "Parsing", "Resilience", "ETL"),
            "https://github.com/dardenkyle/CS2-analytics",  // repoUrl
            null,                                         // liveUrl
            20,                                           // order
            OffsetDateTime.parse("2025-06-30T00:00:00Z"), // updatedAt (ISO 8601) or null
            null,                                         // heroImage
            null,                                         // videoId
            
            /* overview */
            "CS2 Analytics is an open-source, modular backend that scrapes, parses, and normalizes professional Counter-Strike 2 match data into a queryable PostgreSQL schema. I built it end-to-end — data model, scrapers, worker orchestration, and API — with reliability as the primary goal.",
            
            /* techStack */
            List.of(
                new Project.TechItem("python", "Python", "Language", "https://www.python.org", 1),
                new Project.TechItem("sqlalchemy-alembic", "SQLAlchemy + Alembic", "ORM & Migrations", "https://www.sqlalchemy.org", 4),
                new Project.TechItem("fastapi", "FastAPI", "Backend", "https://fastapi.tiangolo.com", 2),
                new Project.TechItem("postgres", "PostgreSQL", "Database", "https://www.postgresql.org", 3),
                new Project.TechItem("beautifulsoup", "BeautifulSoup4", "HTML parsing", "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", 5)
            ),
            
            /* challenges */
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
                )
            )
        ),
        new Project(
            "freightfolio",
            "FreightFolio (Logistics SaaS)",
            "Modular logistics backend for small carriers—AR/AP & invoicing on Postgres with per-service migrations.",
            List.of("invoicing", "AR/AP", "migrations", "auth", "RBAC", "auditability"),
            "https://github.com/dardenkyle/freightfolio-overview",
            null,
            10,
            OffsetDateTime.parse("2025-07-07T00:00:00Z"),
            null,
            null,

            /* overview */
            "Private, production-grade SaaS backend designed for small freight carriers. It provides a modular, scalable system to streamline logistics operations through microservices, focusing on load management, invoicing, and secure user authentication.",

            /* techStack */
            List.of(
                new Project.TechItem("python", "Python", "Language", "https://www.python.org", 1),
                new Project.TechItem("fastapi", "FastAPI", "Backend", "https://fastapi.tiangolo.com", 2),
                new Project.TechItem("postgres", "PostgreSQL", "Database", "https://www.postgresql.org", 3),
                new Project.TechItem("sqlalchemy-alembic", "SQLAlchemy + Alembic", "ORM & Migrations", "https://www.sqlalchemy.org", 4),
                new Project.TechItem("cognito", "AWS Cognito", "Auth", "https://aws.amazon.com/cognito", 5),
                new Project.TechItem("github-actions", "GitHub Actions", "CI/CD", "https://github.com/features/actions", 6)
            ),
            
            /* challenges */
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
