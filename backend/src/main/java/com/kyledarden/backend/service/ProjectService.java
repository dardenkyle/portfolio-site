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
            30,                                           // order
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
        ),
        new Project(
            "portfolio-website",
            "Portfolio Website",
            "Full-stack portfolio — Spring Boot backend + React/Vite frontend, CI/CD.",
            List.of("Full-Stack", "Portfolio", "Deployment"),
            "https://github.com/dardenkyle/portfolio-site",
            null,
            40,
            OffsetDateTime.parse("2025-09-15T00:00:00Z"),
            null,
            null,

            /* overview */
            "Full-stack portfolio website showcasing projects and skills, built with Spring Boot and React/Vite.",

            /* techStack */
            List.of(
                new Project.TechItem("java", "Java", "Language", "https://www.java.com", 1),
                new Project.TechItem("spring-boot", "Spring Boot", "Backend", "https://spring.io/projects/spring-boot", 2),
                new Project.TechItem("react", "React", "Frontend", "https://react.dev", 3),
                new Project.TechItem("vite", "Vite", "Build Tool", "https://vitejs.dev", 4),
                new Project.TechItem("tailwind", "Tailwind CSS", "Styling", "https://tailwindcss.com", 5),
                new Project.TechItem("github-actions", "GitHub Actions", "CI/CD", "https://github.com/features/actions", 6)
            ),
            
            /* challenges */
            List.of(
                new Project.Challenge(
                    "gradle-compatibility",
                    "Fixing incompatible Gradle versions",
                    "The Spring Boot backend wouldn’t build consistently due to mismatched Gradle wrapper and plugin versions.",
                    "Aligned Gradle wrapper version with Spring Boot plugin requirements and updated build configuration.",
                    "Restored reliable local and CI builds; ensured reproducibility across environments.",
                    List.of(),
                    List.of("gradle", "spring-boot", "build-tools"),
                    1
                )
            )
        ),
        new Project(
            "movie-analytics-etl",
            "Movie Analytics ETL Pipeline",
            "End-to-end data engineering project processing 176M+ IMDb records into a dimensional warehouse with dbt and PostgreSQL.",
            List.of("ETL", "Data Engineering", "dbt", "PostgreSQL", "Analytics", "Docker"),
            "https://github.com/dardenkyle/movie_analytics_etl",
            null, // No live demo for ETL pipeline
            20, // Adjust order as needed
            OffsetDateTime.parse("2025-09-21T00:00:00Z"),
            null,
            null,

            /* overview */
            "An end-to-end data engineering project that transforms raw IMDb datasets into a production-ready dimensional data warehouse. The pipeline processes over 176 million records across 5 datasets, implementing comprehensive data quality measures and creating business-ready analytics with interactive dashboards.",

            /* techStack */
            List.of(
                new Project.TechItem("postgresql", "PostgreSQL 16", "Database", "https://www.postgresql.org", 1),
                new Project.TechItem("dbt", "dbt 1.9.1", "Transform Tool", "https://www.getdbt.com", 2),
                new Project.TechItem("python", "Python 3.11+", "Language", "https://www.python.org", 3),
                new Project.TechItem("sql", "SQL", "Query Language", "https://en.wikipedia.org/wiki/SQL", 4),
                new Project.TechItem("docker", "Docker", "Containerization", "https://www.docker.com", 5),
                new Project.TechItem("github-actions", "GitHub Actions", "CI/CD", "https://github.com/features/actions", 6)
            ),
            
            /* challenges */
            List.of(
                new Project.Challenge(
                    "massive-data-processing",
                    "Processing 176M+ records efficiently",
                    "Loading and transforming massive IMDb datasets (176M+ records) while maintaining data quality and managing memory constraints in a containerized environment.",
                    "Implemented incremental dbt models, optimized PostgreSQL configurations, and used chunked data loading with proper indexing strategies to handle large-scale data processing.",
                    "Successfully processed all datasets with 80% data quality test pass rate and created a fully dimensional warehouse ready for analytics.",
                    List.of(
                        new Project.Link("Project README", "https://github.com/dardenkyle/movie_analytics_etl/blob/main/README.md")
                    ),
                    List.of("data-engineering", "postgresql", "dbt", "performance"),
                    1
                ),
                new Project.Challenge(
                    "referential-integrity",
                    "Maintaining data relationships across complex schema",
                    "IMDb datasets contain complex relationships between titles, names, ratings, and crew data, with many orphaned records and missing references that needed to be cleaned.",
                    "Built comprehensive dbt data quality tests (30 total) covering nulls, uniqueness, and relationships. Implemented staging models to handle orphaned records and proper foreign key constraints.",
                    "Achieved referential integrity across all dimensional tables with proper handling of missing data and comprehensive documentation of data lineage.",
                    List.of(),
                    List.of("data-quality", "dbt", "dimensional-modeling"),
                    2
                )
            )
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
