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
                    "Live, end-to-end CS2 analytics platform - Python ingestion pipeline into PostgreSQL, a public FastAPI on Render, and a React dashboard on GitHub Pages.",
                    List.of("Gaming Analytics", "Data Pipeline", "Web Scraping", "API Development", "Automation"),
                    "https://github.com/dardenkyle/CS2-analytics",
                    "https://dardenkyle.github.io/CS2-analytics/",
                    30,
                    OffsetDateTime.parse("2025-06-30T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "CS2 Analytics is an open-source platform that scrapes, parses, and normalizes professional Counter-Strike 2 match data into a queryable PostgreSQL schema. I built it end-to-end - data model, scrapers, ingestion-state orchestration, API, and frontend - with reliability as the primary goal. It is deployed end to end: the FastAPI service runs on Render and a React dashboard on GitHub Pages serves player statistics from the production database.",

                    /* techStack - now using references to TechService */
                    List.of(
                            new Project.TechReference("python", 1),
                            new Project.TechReference("sql", 2),
                            new Project.TechReference("fastapi", 3),
                            new Project.TechReference("postgresql", 4),
                            new Project.TechReference("sqlalchemy", 5),
                            new Project.TechReference("beautifulsoup", 6),
                            new Project.TechReference("react", 7),
                            new Project.TechReference("typescript", 8),
                            new Project.TechReference("vite", 9),
                            new Project.TechReference("docker", 10),
                            new Project.TechReference("github-actions", 11),
                            new Project.TechReference("pytest", 12),
                            new Project.TechReference("git", 13)),

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
                                    "from-long-runner-to-ingestion-state",
                                    "Migrating from a single long-running script to ingestion-state tables",
                                    "Initial ingestion ran as one long process, making failures costly and restarts painful; no isolation between work units and no durable record of what had been processed.",
                                    "Refactored around PostgreSQL-backed ingestion-state tables for matches, maps, and demos, with source IDs as primary keys and explicit lifecycle states (rediscovery, retry, processed, failed, skipped) so rediscovery refreshes existing rows instead of duplicating work. Batch controllers own retry policy, scraper reset/rotation, and run summaries, while per-item stage services own fetch/parse/persist outcomes; scrapers only fetch and parsers only parse.",
                                    "The pipeline is resumable and idempotent - failed items can be retried without re-running the entire pipeline.",
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
                                    "Introduced `.env`-driven configuration, uv-managed dependencies with a committed lockfile, Alembic migrations behind a one-command DB init (`manage_db.py --init`), and Makefile-style entrypoints for setup, runs, and tests.",
                                    "Reduced setup friction and made runs predictable; the setup evolved into the Docker Compose and CI baseline the project runs on today.",
                                    List.of(),
                                    List.of("python", "git", "devx"),
                                    3)

                    )),
            new ProjectTemplate(
                    "freightfolio",
                    "FreightFolio (Logistics SaaS)",
                    "Modular logistics SaaS backend for small carriers - AR/AP modules with per-service migrations, AWS Cognito authentication, and Dockerized PostgreSQL.",
                    List.of("Logistics", "SaaS Platform", "Auth (AWS Cognito)", "API Backend"),
                    "https://github.com/dardenkyle/freightfolio-overview",
                    null,
                    10,
                    OffsetDateTime.parse("2025-07-07T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "Private SaaS backend designed for small freight carriers; active development is paused after the venture behind it ended before launch. It provides a modular system to streamline logistics operations through FastAPI services, focusing on load management, invoicing, and secure user authentication via AWS Cognito. Multi-tenant data isolation is designed but not yet enabled. Not deployed; the source is private, with a public overview repo.",

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
                                    "Designing for tenant data isolation",
                                    "Planned multi-tenancy requires strict data isolation on a shared PostgreSQL schema with tenant_id on every table, without hurting query performance on tenant-scoped APIs.",
                                    "Designed tenant-aware query filters at the FastAPI dependency layer with request-scoped tenant context, and composite indexes on (tenant_id, key columns). Documented patterns for inserts and joins so tenancy can be enabled consistently across services.",
                                    "The isolation model is settled and documented, ready to enable when multi-tenancy lands on the roadmap.",
                                    List.of(),
                                    List.of("postgresql", "sql", "fastapi", "sqlalchemy + alembic", "api-design",
                                            "performance"),
                                    1),

                            new Project.Challenge(
                                    "cognito-auth-rbac",
                                    "Integrating AWS Cognito with tenant-aware RBAC",
                                    "Needed authentication/authorization with roles and tenant context; JWTs had to carry role + tenant_id and be verified per route.",
                                    "Provisioned Cognito user pool & app client; normalized users/roles/tenants in Postgres; added JWT verification middleware and route-level role checks; mapped claims → request context for downstream queries.",
                                    "Secure authentication in place: route-level guards, least-privilege access, and auditable user/role changes.",
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
                    "https://kyledarden.com",
                    40,
                    OffsetDateTime.parse("2025-09-15T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "Full-stack portfolio website showcasing projects and skills, built with Spring Boot and React/Vite. The frontend is deployed to GitHub Pages at kyledarden.com via GitHub Actions; the Spring Boot API is hosted separately on Render.",

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
                                    "Configured environment variables and API base URLs per environment, implemented CORS rules in Spring Boot, and validated integration through Postman and live staging builds. Automated the frontend deploy via GitHub Actions; the backend deploys separately on Render.",
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
                            new Project.TechReference("docker", 7),
                            new Project.TechReference("git", 8),
                            new Project.TechReference("github-actions", 9)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "massive-data-processing",
                                    "Processing 176M+ records efficiently",
                                    "Loading and transforming massive IMDb datasets (176M+ records) while maintaining data quality and managing memory constraints during transformation and load operations.",
                                    "Implemented bulk loading with PostgreSQL COPY driven by Python (psycopg2), staging data in a raw schema before transformation. Kept dbt models modular across staging and marts layers so rebuilds stay manageable.",
                                    "Successfully processed all five datasets into the warehouse with an 80% data quality test pass rate across dbt layers.",
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
                                    3))),

            new ProjectTemplate(
                    "site-sentry",
                    "Site Sentry (QA Automation)",
                    "Automated QA suite for kyledarden.com - Playwright + Pytest browser tests running twice daily via GitHub Actions, with HTML reports and Docker support.",
                    List.of("QA Automation", "Testing", "CI/CD", "Monitoring"),
                    "https://github.com/dardenkyle/site-sentry",
                    "https://dardenkyle.github.io/site-sentry/",
                    50,
                    OffsetDateTime.parse("2025-10-15T00:00:00Z"),
                    null,
                    null,

                    /* overview */
                    "site-sentry is an automated QA suite that continuously verifies kyledarden.com. Playwright drives real-browser smoke, navigation, and UI tests orchestrated with Pytest, and a scheduled GitHub Actions workflow runs the suite twice daily. Failures produce HTML reports with screenshots, and the suite runs locally or in Docker for consistent environments. A live dashboard publishes uptime and Navigation Timing trends collected from each scheduled run.",

                    /* techStack - using references to TechService */
                    List.of(
                            new Project.TechReference("python", 1),
                            new Project.TechReference("playwright", 2),
                            new Project.TechReference("pytest", 3),
                            new Project.TechReference("docker", 4),
                            new Project.TechReference("github-actions", 5),
                            new Project.TechReference("git", 6)),

                    /* challenges */
                    List.of(
                            new Project.Challenge(
                                    "scheduled-browser-tests-in-ci",
                                    "Running browser tests unattended on a schedule",
                                    "Real-browser tests had to run twice a day in CI without anyone watching, so failures needed to be diagnosable after the fact rather than reproduced live.",
                                    "Built a scheduled GitHub Actions workflow around Playwright with Pytest as the runner, generating HTML reports and capturing screenshots automatically on failure. Kept the suite fast so scheduled runs give quick feedback.",
                                    "Twice-daily automated runs complete in about two and a half minutes, with report artifacts that make failures reviewable without rerunning.",
                                    List.of(),
                                    List.of("Playwright", "Pytest", "GitHub Actions", "CI/CD"),
                                    1),

                            new Project.Challenge(
                                    "consistent-test-environments",
                                    "Keeping local and CI test environments identical",
                                    "Browser automation is sensitive to environment drift - browser versions, dependencies, and OS differences can make tests pass locally and fail in CI.",
                                    "Containerized the suite with Docker so the same image runs locally and in CI, and managed dependencies with Poetry with pinned Playwright browser installs.",
                                    "The suite behaves the same everywhere it runs, from a laptop to the scheduled CI workflow.",
                                    List.of(),
                                    List.of("Docker", "Python", "devx"),
                                    2))));

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