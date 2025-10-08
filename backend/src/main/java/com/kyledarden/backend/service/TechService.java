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
            new TechItem("Python", "Languages", "python",
                    "A versatile, high-level programming language known for its readability and extensive ecosystem. Excellent for data science, web development, automation, and AI/ML applications.",
                    YearMonth.of(2023, 8),
                    new ArrayList<>()),

            new TechItem("Java", "Languages", "java",
                    "Enterprise-grade, object-oriented programming language with strong typing and platform independence. Widely used for large-scale applications and backend systems.",
                    YearMonth.of(2025, 8),
                    new ArrayList<>()),

            new TechItem("TypeScript", "Languages", "typescript",
                    "JavaScript with static type definitions, providing better tooling, error catching, and code maintainability for large-scale frontend applications.",
                    YearMonth.of(2025, 8),
                    new ArrayList<>()),

            new TechItem("FastAPI", "Backend & APIs", "fastapi",
                    "Modern, fast web framework for building APIs with Python based on standard Python type hints. Provides automatic interactive API documentation.",
                    YearMonth.of(2025, 3),
                    new ArrayList<>()),

            new TechItem("Spring Boot", "Backend & APIs", "spring-boot",
                    "Opinionated framework that simplifies the development of production-ready Spring applications with embedded servers and auto-configuration.",
                    YearMonth.of(2025, 8),
                    new ArrayList<>()),

            new TechItem("React", "Frontend & UI", "react",
                    "Component-based JavaScript library for building user interfaces. Enables creation of reusable UI components and efficient state management.",
                    YearMonth.of(2025, 8),
                    new ArrayList<>()),

            new TechItem("Tailwind CSS", "Frontend & UI", "tailwind-css",
                    "Utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS.",
                    YearMonth.of(2025, 8),
                    new ArrayList<>()),

            new TechItem("PostgreSQL", "Data & Infrastructure", "postgresql",
                    "Advanced open-source relational database with excellent performance, reliability, and feature robustness including JSON support and advanced indexing.",
                    YearMonth.of(2023, 8),
                    new ArrayList<>()),

            new TechItem("Docker", "Data & Infrastructure", "docker",
                    "Containerization platform that enables packaging applications with their dependencies into lightweight, portable containers for consistent deployment.",
                    YearMonth.of(2025, 6),
                    new ArrayList<>()),

            new TechItem("AWS", "Data & Infrastructure", "aws",
                    "Comprehensive cloud computing platform offering scalable infrastructure, storage, databases, and numerous managed services for modern applications.",
                    YearMonth.of(2025, 3),
                    new ArrayList<>()),

            new TechItem("dbt", "Data & Infrastructure", "dbt",
                    "Data transformation tool that enables analytics engineers to transform data in their warehouse using SQL and software engineering best practices.",
                    YearMonth.of(2025, 9),
                    new ArrayList<>()),

            new TechItem("GitHub Actions", "Data & Infrastructure", "github-actions",
                    "Automation platform that enables continuous integration and deployment workflows directly within GitHub repositories.",
                    YearMonth.of(2025, 3),
                    new ArrayList<>())
    );

    public List<TechItem> getAllTechItems() {
        return techItems;
    }

    public Optional<TechItem> getTechItemBySlug(String slug) {
        return techItems.stream()
                .filter(item -> item.getSlug().equals(slug))
                .findFirst();
    }
}