package com.kyledarden.backend.service;

import com.kyledarden.backend.model.TechItem;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class TechService {

        private final List<TechItem> techItems = Arrays.asList(

                        // ------------------ DATA ENGINEERING ------------------
                        new TechItem("dbt", "Data Engineering", "dbt",
                                        "dbt drives the transformation layer of my data warehouse work. My movie analytics ETL project models 176M+ IMDb records into a Kimball star schema with staging and marts layers, backed by 30+ data-quality tests.",
                                        YearMonth.of(2025, 9),
                                        new ArrayList<>()),

                        new TechItem("PostgreSQL", "Data Engineering", "postgresql",
                                        "PostgreSQL is my primary data store for both warehousing and applications. I design dimensional models for analytics warehouses and normalized schemas for services like CS2 Analytics.",
                                        YearMonth.of(2023, 8),
                                        new ArrayList<>()),

                        new TechItem("SQLAlchemy", "Data Engineering", "sqlalchemy",
                                        "I use SQLAlchemy to define relational models and queries in my Python services, keeping database access and schema management clean across ingestion pipelines and APIs.",
                                        YearMonth.of(2023, 8),
                                        new ArrayList<>()),

                        new TechItem("Pandas", "Data Engineering", "pandas",
                                        "My core library for data wrangling in ETL pipelines. I use it to clean, reshape, and prepare large datasets before loading them into PostgreSQL.",
                                        YearMonth.of(2023, 8),
                                        new ArrayList<>()),

                        new TechItem("NumPy", "Data Engineering", "numpy",
                                        "I use NumPy for efficient numerical computation and vectorized operations when transforming and analyzing datasets.",
                                        YearMonth.of(2023, 8),
                                        new ArrayList<>()),

                        new TechItem("BeautifulSoup", "Data Engineering", "beautifulsoup",
                                        "I use BeautifulSoup for web scraping and HTML parsing to extract structured data from web pages for ingestion pipelines and data collection projects.",
                                        YearMonth.of(2024, 1),
                                        new ArrayList<>()),

                        // ------------------ LANGUAGES ------------------
                        new TechItem("Python", "Languages", "python",
                                        "Python is my primary language for data engineering. I use it for ingestion pipelines, ETL jobs, and the FastAPI services that serve the results, including the CS2 Analytics pipeline with its Typer-based CLI.",
                                        YearMonth.of(2023, 8),
                                        new ArrayList<>()),

                        new TechItem("SQL", "Languages", "sql",
                                        "SQL is the foundation of my data work. I write analytical queries, design dimensional and normalized schemas, and build dbt transformations across staging and marts layers.",
                                        YearMonth.of(2024, 5),
                                        new ArrayList<>()),

                        new TechItem("Java", "Languages", "java",
                                        "I use Java with Spring Boot for backend services, including the API behind this portfolio site. I lean on its strong typing and mature tooling to keep services well-tested and maintainable.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        new TechItem("TypeScript", "Languages", "typescript",
                                        "TypeScript keeps my React frontends type-safe and maintainable, including the CS2 Analytics dashboard and this site.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        // ------------------ BACKEND ------------------
                        new TechItem("FastAPI", "Backend", "fastapi",
                                        "FastAPI powers my Python APIs, including the live CS2 Analytics service and the in-development FreightFolio backend with its AWS Cognito auth.",
                                        YearMonth.of(2025, 3),
                                        new ArrayList<>()),

                        new TechItem("Spring Boot", "Backend", "spring-boot",
                                        "Spring Boot runs this portfolio's intentionally lightweight Java 21 REST API, with test coverage and CI on every change.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        // ------------------ FRONTEND ------------------
                        new TechItem("React", "Frontend", "react",
                                        "My framework of choice for creating modular, responsive UIs. I use it for the CS2 Analytics dashboard and this portfolio site.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        new TechItem("Tailwind CSS", "Frontend", "tailwind-css",
                                        "Used for rapid UI prototyping and design consistency. I apply it to build minimal, professional web layouts efficiently.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        new TechItem("Vite", "Frontend", "vite",
                                        "Modern build tool I use for fast React development with hot module replacement and optimized production builds.",
                                        YearMonth.of(2025, 8),
                                        new ArrayList<>()),

                        // ------------------ DEVOPS & TOOLS ------------------
                        new TechItem("Docker", "DevOps & Tools", "docker",
                                        "I containerize services for reproducible environments and consistent CI/CD, including Dockerized Postgres for FreightFolio's per-service databases and migrations.",
                                        YearMonth.of(2025, 6),
                                        new ArrayList<>()),

                        new TechItem("AWS", "DevOps & Tools", "aws",
                                        "I use AWS Cognito for production-grade authentication in FreightFolio, with JWKS caching, key rotation, and RS256 token verification. Expanding skills with S3, Lambda, ECS, and RDS for full-stack deployments.",
                                        YearMonth.of(2025, 3),
                                        new ArrayList<>()),

                        new TechItem("GitHub Actions", "DevOps & Tools", "github-actions",
                                        "I automate tests, builds, and deployments with GitHub Actions, including CI for CS2 Analytics and a twice-daily QA suite that monitors this site.",
                                        YearMonth.of(2025, 3),
                                        new ArrayList<>()),

                        new TechItem("Git", "DevOps & Tools", "git",
                                        "Used for version control and collaboration across all projects with branching and PR-based workflows in GitHub.",
                                        YearMonth.of(2022, 7),
                                        new ArrayList<>()),

                        new TechItem("Pytest", "DevOps & Tools", "pytest",
                                        "I use Pytest for unit and integration testing, including 137 automated tests on CS2 Analytics and the Playwright + Pytest QA suite that checks this site twice daily.",
                                        YearMonth.of(2024, 3),
                                        new ArrayList<>()),

                        new TechItem("Playwright", "DevOps & Tools", "playwright",
                                        "I use Playwright for real-browser automation in my QA work. It drives site-sentry's smoke, navigation, and UI checks against kyledarden.com on a twice-daily schedule.",
                                        YearMonth.of(2025, 10),
                                        new ArrayList<>()));

        public List<TechItem> getAllTechItems() {
                return techItems;
        }

        public Optional<TechItem> getTechItemBySlug(String slug) {
                return techItems.stream()
                                .filter(item -> item.getSlug().equals(slug))
                                .findFirst();
        }

        /**
         * Helper method to populate project associations for tech items
         * This avoids circular dependency by taking projects as a parameter
         */
        public List<TechItem> getAllTechItemsWithProjects(List<com.kyledarden.backend.model.Project> projects) {
                return techItems.stream()
                                .map(techItem -> {
                                        List<com.kyledarden.backend.model.Project> associatedProjects = projects
                                                        .stream()
                                                        .filter(project -> project.getTechStack().stream()
                                                                        .anyMatch(tech -> tech.getId()
                                                                                        .equals(techItem.getSlug())))
                                                        .collect(java.util.stream.Collectors.toList());

                                        // Create a new TechItem with the populated projects
                                        return new TechItem(
                                                        techItem.getName(),
                                                        techItem.getCategory(),
                                                        techItem.getSlug(),
                                                        techItem.getDescription(),
                                                        techItem.getStartDate(),
                                                        associatedProjects);
                                })
                                .collect(java.util.stream.Collectors.toList());
        }
}