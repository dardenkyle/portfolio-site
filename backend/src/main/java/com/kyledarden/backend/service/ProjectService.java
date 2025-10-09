package com.kyledarden.backend.service;

import com.kyledarden.backend.model.Project;
import com.kyledarden.backend.model.TechItem;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final TechService techService;

    public ProjectService(TechService techService) {
        this.techService = techService;
    }

    /**
     * Helper method to resolve tech references to actual TechItem objects from
     * TechService
     */
    private List<Project.TechItem> resolveTechReferences(List<Project.TechReference> references) {
        return references.stream()
                .map(ref -> {
                    TechItem techItem = techService.getTechItemBySlug(ref.getSlug())
                            .orElseThrow(() -> new RuntimeException("Tech item not found: " + ref.getSlug()));
                    return new Project.TechItem(
                            techItem.getSlug(),
                            techItem.getName(),
                            techItem.getCategory(),
                            "", // We'll need to add URL support to TechService if needed
                            ref.getOrder());
                })
                .sorted((a, b) -> Integer.compare(a.getOrder(), b.getOrder()))
                .collect(Collectors.toList());
    }

    /**
     * Helper method to create a project with tech references resolved from
     * TechService
     */
    private Project createProjectWithResolvedTech(String slug, String title, String summary, List<String> tags,
            String repoUrl, String liveUrl, Integer order, OffsetDateTime updatedAt,
            String heroImage, String videoId, String overview,
            List<Project.TechReference> techReferences, List<Project.Challenge> challenges) {
        List<Project.TechItem> resolvedTechStack = resolveTechReferences(techReferences);
        return new Project(slug, title, summary, tags, repoUrl, liveUrl, order, updatedAt,
                heroImage, videoId, overview, resolvedTechStack, challenges);
    }

    // Store project templates that will be resolved lazily
    private static class ProjectTemplate {
        final String slug, title, summary;
        final List<String> tags;
        final String repoUrl, liveUrl;
        final Integer order;
        final OffsetDateTime updatedAt;
        final String heroImage, videoId, overview;
        final List<Project.TechReference> techReferences;
        final List<Project.Challenge> challenges;

        ProjectTemplate(String slug, String title, String summary, List<String> tags,
                String repoUrl, String liveUrl, Integer order, OffsetDateTime updatedAt,
                String heroImage, String videoId, String overview,
                List<Project.TechReference> techReferences, List<Project.Challenge> challenges) {
            this.slug = slug;
            this.title = title;
            this.summary = summary;
            this.tags = tags;
            this.repoUrl = repoUrl;
            this.liveUrl = liveUrl;
            this.order = order;
            this.updatedAt = updatedAt;
            this.heroImage = heroImage;
            this.videoId = videoId;
            this.overview = overview;
            this.techReferences = techReferences;
            this.challenges = challenges;
        }
    }

    // Store project templates that will be resolved lazily
    private final List<ProjectTemplate> projectTemplates = List.of(
            new ProjectTemplate(
                    "cs2-analytics",
                    "CS2 Analytics Platform",
                    "Queue-based backend that scrapes and normalizes CS2 match data into a queryable Postgres schema.",
                    List.of("Gaming Analytics", "Data Pipeline", "Web Scraping", "API Development", "Automation"),
                    "https://github.com/dardenkyle/CS2-analytics",
                    null,
                    30,
                    OffsetDateTime.parse("2025-06-30T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "CS2 Analytics is an open-source, modular backend that scrapes, parses, and normalizes professional Counter-Strike 2 match data into a queryable PostgreSQL schema. I built it end-to-end — data model, scrapers, worker orchestration, and API — with reliability as the primary goal.",

                    /* techStack - now using references to TechService */
                    List.of(
                            new Project.TechReference("python", 1),
                            new Project.TechReference("fastapi", 2),
                            new Project.TechReference("postgresql", 3),
                            new Project.TechReference("sqlalchemy", 4),
                            new Project.TechReference("beautifulsoup", 5),
                            new Project.TechReference("git", 6),
                            new Project.TechReference("pytest", 8),
                            new Project.TechReference("postman", 9)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "anti-bot-web-scraping",
                                    "Bypassing bot detection to scrape reliably",
                                    "Standard requests/Selenium were blocked by anti-bot measures, breaking ingestion and causing intermittent failures.",
                                    "Switched to SeleniumBase with human-like interaction settings and added retry/backoff logic. Centralized selectors, added health checks, and built a small harness to verify page states before extraction.",
                                    "Achieved stable scrape sessions across long runs with far fewer blocks and timeouts.",
                                    List.of(),
                                    List.of("python", "web-scraping", "resilience"),
                                    1),

                            new Project.Challenge(
                                    "from-long-runner-to-queued-jobs",
                                    "Migrating from a single long-running script to a queued pattern",
                                    "Initial ingestion ran as one long process, making failures costly and restarts painful; no isolation between work units.",
                                    "Refactored into discrete idempotent jobs (per-match/per-page) with checkpointing and deduping. Introduced a simple terminal-driven dispatch loop to enqueue/dequeue units and record progress.",
                                    "Improved resilience and recovery—failed jobs can be retried without re-running the entire pipeline.",
                                    List.of(),
                                    List.of("python", "architecture", "idempotency"),
                                    1),

                            new Project.Challenge(
                                    "normalized-schema-and-idempotent-upserts",
                                    "Designing inserts to avoid duplicates while normalizing",
                                    "Data was mostly complete but required consistent keys and relationships; reprocessing risked duplicate rows.",
                                    "Defined a normalized Postgres schema with unique constraints and implemented idempotent upserts (ON CONFLICT) for matches, teams, and players. Added lightweight validation before writes.",
                                    "Enabled safe reprocessing of records without duplication while maintaining referential integrity.",
                                    List.of(),
                                    List.of("sql", "postgresql", "data-modeling"),
                                    2),

                            new Project.Challenge(
                                    "env-parity-without-containers",
                                    "Maintaining reproducible local environments before containerization",
                                    "Different developer machines and OS setups led to inconsistent Python deps, env vars, and DB connections.",
                                    "Introduced `.env.example`, Makefile tasks (setup/run/test), pinned versions, seed scripts, and a Postman collection for API checks. Documented one-command bootstrap and DB init steps.",
                                    "Reduced setup friction and made runs predictable; paved the way for future Docker/CI adoption.",
                                    List.of(),
                                    List.of("python", "git", "postman", "devx"),
                                    3)

                    )),
            new ProjectTemplate(
                    "freightfolio",
                    "FreightFolio (Logistics SaaS)",
                    "Modular logistics SaaS backend for small carriers — AR/AP modules with per-service migrations, authentication via AWS Cognito, and a multi-tenant PostgreSQL design.",
                    List.of("Logistics", "SaaS Platform", "Auth (AWS Cognito)", "Multi-tenant", "API Backend"),
                    "https://github.com/dardenkyle/freightfolio-overview",
                    null,
                    10,
                    OffsetDateTime.parse("2025-07-07T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "Private, production-grade SaaS backend designed for small freight carriers. It provides a modular, scalable system to streamline logistics operations through microservices, focusing on load management, invoicing, and secure user authentication.",

                    /* techStack - using references to TechService */
                    List.of(
                            new Project.TechReference("python", 1),
                            new Project.TechReference("fastapi", 2),
                            new Project.TechReference("sql", 3),
                            new Project.TechReference("postgresql", 4),
                            new Project.TechReference("sqlalchemy", 5),
                            new Project.TechReference("docker", 6),
                            new Project.TechReference("git", 7),
                            new Project.TechReference("github-actions", 8),
                            new Project.TechReference("aws", 9)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "multi-tenant-shared-schema",
                                    "Ensuring data isolation with a shared schema",
                                    "Used a shared PostgreSQL schema with tenant_id on every table; needed strict isolation and performant queries while exposing tenant-scoped APIs.",
                                    "Added tenant-aware query filters at the FastAPI dependency layer, enforced request-scoped tenant context, and created composite indexes on (tenant_id, key columns). Documented patterns for inserts/joins and added tests for cross-tenant leakage.",
                                    "Achieved clean isolation with zero cross-tenant leaks in tests and sub-50ms median queries on tenant-scoped endpoints.",
                                    List.of(),
                                    List.of("postgresql", "sql", "fastapi", "sqlalchemy + alembic", "api-design",
                                            "performance"),
                                    1),

                            new Project.Challenge(
                                    "cognito-auth-rbac",
                                    "Integrating AWS Cognito with tenant-aware RBAC",
                                    "Needed authentication/authorization with roles and tenant context; JWTs had to carry role + tenant_id and be verified per route.",
                                    "Provisioned Cognito user pool & app client; normalized users/roles/tenants in Postgres; added JWT verification middleware and route-level role checks; mapped claims → request context for downstream queries.",
                                    "Secure multi-tenant auth in place: route-level guards, least-privilege access, and auditable user/role changes.",
                                    List.of(),
                                    List.of("aws", "fastapi", "postgresql", "api-security", "auth"),
                                    2),

                            new Project.Challenge(
                                    "alembic-per-service-migrations",
                                    "Untangling migration conflicts across services",
                                    "Shared migrations caused version collisions and broken upgrades when services evolved independently.",
                                    "Split into per-service Alembic trees with service-specific version tables; enforced naming/versioning conventions; added CI checks to run forward/backward migrations per service before merge.",
                                    "Zero migration conflicts since split; reproducible up/down across services and safer deploys.",
                                    List.of(),
                                    List.of("sqlalchemy + alembic", "postgresql", "github actions", "ci/cd"),
                                    3),

                            new Project.Challenge(
                                    "cross-os-dev-environments",
                                    "Consistent local env across Windows and macOS",
                                    "Onboarding and troubleshooting differed by OS (paths, shells, env vars, Docker behavior).",
                                    "Created OS-aware setup scripts (Windows/mac), `.env` templates, Make/NPM tasks, and Docker Compose profiles; documented one-command boot and added preflight checks.",
                                    "Reduced setup time to minutes with identical local parity; fewer ‘works on my machine’ issues.",
                                    List.of(),
                                    List.of("docker", "git", "github actions", "devx"),
                                    4))),
            new ProjectTemplate(
                    "portfolio-website",
                    "Portfolio Website",
                    "Full-stack portfolio — Spring Boot backend + React/Vite frontend, CI/CD.",
                    List.of("Full-Stack", "Portfolio", "Deployment", "UI/UX"),
                    "https://github.com/dardenkyle/portfolio-site",
                    null,
                    40,
                    OffsetDateTime.parse("2025-09-15T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "Full-stack portfolio website showcasing projects and skills, built with Spring Boot and React/Vite.",

                    /* techStack - using references to TechService */
                    List.of(
                            new Project.TechReference("java", 1),
                            new Project.TechReference("spring-boot", 2),
                            new Project.TechReference("react", 3),
                            new Project.TechReference("typescript", 4),
                            new Project.TechReference("vite", 5),
                            new Project.TechReference("tailwind-css", 6),
                            new Project.TechReference("docker", 7),
                            new Project.TechReference("git", 8),
                            new Project.TechReference("github-actions", 9)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "gradle-compatibility",
                                    "Fixing incompatible Gradle versions",
                                    "The Spring Boot backend wouldn't build consistently due to mismatched Gradle wrapper and plugin versions.",
                                    "Aligned Gradle wrapper version with Spring Boot plugin requirements and updated build configuration.",
                                    "Restored reliable local and CI builds; ensured reproducibility across environments.",
                                    List.of(),
                                    List.of("gradle", "spring-boot", "build-tools"),
                                    1),
                            new Project.Challenge(
                                    "cross-origin-deployment",
                                    "Coordinating separate frontend and backend deployments",
                                    "Frontend hosted on GitHub Pages and backend on Render required consistent routing, API URLs, and secure CORS configuration for production environments.",
                                    "Configured environment variables and API base URLs per environment, implemented CORS rules in Spring Boot, and validated integration through Postman and live staging builds. Automated both deploys via GitHub Actions workflows.",
                                    "Seamless communication between GitHub-hosted frontend and Render backend with stable API connectivity and secure CORS handling.",
                                    List.of(),
                                    List.of("Java", "Spring Boot", "React", "TypeScript", "GitHub Actions", "Postman",
                                            "Git"),
                                    1),

                            new Project.Challenge(
                                    "frontend-backend-integration",
                                    "Integrating React frontend with Spring Boot backend",
                                    "Needed to connect a Vite/React TypeScript frontend with a Spring Boot API while maintaining consistent API endpoints across environments.",
                                    "Standardized API route structures, configured environment variables for dev/prod, and validated endpoints using Postman collections. Added frontend proxy rules to simplify local development.",
                                    "Consistent API integration across environments and faster debugging during development.",
                                    List.of(),
                                    List.of("React", "TypeScript", "Spring Boot", "Java", "Postman", "Git"),
                                    2),

                            new Project.Challenge(
                                    "performance-and-responsive-ux",
                                    "Optimizing performance and responsiveness across devices",
                                    "Interactive visuals and complex layouts initially caused layout shifts and lag on mobile screens.",
                                    "Implemented device-aware toggles to disable animations on mobile, lazy-loaded heavy components, and refined Tailwind utility usage for flexible responsive design.",
                                    "Improved mobile responsiveness and load times while maintaining a polished desktop experience.",
                                    List.of(),
                                    List.of("React", "TypeScript", "Tailwind CSS"),
                                    3),

                            new Project.Challenge(
                                    "env-config-and-ci",
                                    "Managing environment configuration and CI consistency",
                                    "Needed to maintain distinct configurations for development and production while ensuring consistent builds and deploys.",
                                    "Standardized `.env` variables, parameterized Spring profiles, and implemented GitHub Actions workflows for linting, build, and deploy steps. Documented the CI process for transparency and repeatability.",
                                    "Consistent, automated deployments with minimal manual setup and clear separation between environments.",
                                    List.of(),
                                    List.of("GitHub Actions", "Docker", "Spring Boot", "React", "Git"),
                                    4))),

            new ProjectTemplate(
                    "movie-analytics-etl",
                    "Movie Analytics ETL Pipeline",
                    "End-to-end data engineering project processing 176M+ IMDb records into a dimensional warehouse with dbt and PostgreSQL.",
                    List.of("Data Engineering", "Data Warehouse", "ETL Pipeline", "Dimensional Modeling", "Automation"),
                    "https://github.com/dardenkyle/movie_analytics_etl",
                    null, // No live demo for ETL pipeline
                    20, // Adjust order as needed
                    OffsetDateTime.parse("2025-09-21T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "An end-to-end data engineering project that transforms raw IMDb datasets into a production-ready dimensional data warehouse. The pipeline processes over 176 million records across 5 datasets, implementing comprehensive data quality measures and creating business-ready analytics with interactive dashboards.",

                    /* techStack - using references to TechService */
                    List.of(
                            new Project.TechReference("python", 1),
                            new Project.TechReference("sql", 2),
                            new Project.TechReference("postgresql", 3),
                            new Project.TechReference("dbt", 4),
                            new Project.TechReference("pandas", 5),
                            new Project.TechReference("numpy", 6),
                            new Project.TechReference("plotly", 8),
                            new Project.TechReference("jupyter", 9),
                            new Project.TechReference("docker", 10),
                            new Project.TechReference("git", 11),
                            new Project.TechReference("github-actions", 12)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "massive-data-processing",
                                    "Processing 176M+ records efficiently",
                                    "Loading and transforming massive IMDb datasets (176M+ records) while maintaining data quality and managing memory constraints during transformation and load operations.",
                                    "Implemented chunked data loading using Python and optimized PostgreSQL configurations (work_mem, parallel workers). Leveraged incremental dbt models to reduce rebuild times and created indexes for high-cardinality joins.",
                                    "Successfully processed all datasets with sub-hour model refreshes and 80% data quality test pass rate across dbt layers.",
                                    List.of(),
                                    List.of("Python", "dbt", "PostgreSQL", "Data Engineering", "Performance"),
                                    1),

                            new Project.Challenge(
                                    "referential-integrity",
                                    "Maintaining data relationships across complex schema",
                                    "IMDb datasets contain deeply linked entities (titles, people, ratings, crew) with missing and orphaned references that caused broken joins and duplicate facts.",
                                    "Implemented dbt staging and intermediate models with referential integrity filters. Added 30+ dbt tests covering nulls, uniqueness, and foreign key consistency. Built scripts to identify and patch orphaned records.",
                                    "Achieved referential integrity across all fact and dimension tables with reproducible test coverage and clean lineage between sources and marts.",
                                    List.of(),
                                    List.of("dbt", "Data Quality", "Dimensional Modeling", "PostgreSQL"),
                                    2),

                            new Project.Challenge(
                                    "dimensional-modeling",
                                    "Designing a warehouse for analytics-ready insights",
                                    "Needed a well-structured dimensional model to support analytics on movies, people, and ratings efficiently.",
                                    "Designed a star schema with fact tables for ratings and dimensions for titles, people, and genres. Applied dbt documentation blocks for column-level metadata and lineage visualization. Tuned surrogate keys and joins for performant aggregation queries.",
                                    "Delivered a clean dimensional warehouse powering downstream analytics and dashboards with minimal join complexity and intuitive naming conventions.",
                                    List.of(),
                                    List.of("dbt", "PostgreSQL", "Data Modeling", "Analytics"),
                                    3))));

    public List<Project> all() {
        return projectTemplates.stream()
                .map(template -> createProjectWithResolvedTech(
                        template.slug, template.title, template.summary, template.tags,
                        template.repoUrl, template.liveUrl, template.order, template.updatedAt,
                        template.heroImage, template.videoId, template.overview,
                        template.techReferences, template.challenges))
                .collect(Collectors.toList());
    }

    public Project getBySlug(String slug) {
        return projectTemplates.stream()
                .filter(template -> template.slug.equalsIgnoreCase(slug))
                .findFirst()
                .map(template -> createProjectWithResolvedTech(
                        template.slug, template.title, template.summary, template.tags,
                        template.repoUrl, template.liveUrl, template.order, template.updatedAt,
                        template.heroImage, template.videoId, template.overview,
                        template.techReferences, template.challenges))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }
}