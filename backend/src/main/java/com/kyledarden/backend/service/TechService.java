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

        // ------------------ LANGUAGES ------------------
        new TechItem("Python", "Languages", "python",
            "My primary language for backend development, ETL pipelines, and data analysis. I use it for FastAPI services, Pandas workflows, and machine learning experiments.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("SQL", "Languages", "sql",
            "Essential for data engineering and analytics. I write complex queries, optimize schemas, and integrate SQL logic across ETL and reporting pipelines.",
            YearMonth.of(2024, 5),
            new ArrayList<>()),

        new TechItem("Java", "Languages", "java",
            "I leverage Java for enterprise-grade backend systems with Spring Boot, focusing on scalable REST APIs and strong typing. Currently studying DSA with Java.",
            YearMonth.of(2025, 8),
            new ArrayList<>()),

        new TechItem("TypeScript", "Languages", "typescript",
            "Used for building type-safe React applications and maintaining reliability in frontend logic. Ensures clean, maintainable UI development.",
            YearMonth.of(2025, 8),
            new ArrayList<>()),

        // ------------------ BACKEND & DATA ------------------
        new TechItem("FastAPI", "Backend", "fastapi",
            "My preferred Python framework for building high-performance APIs. I use it to power backend services, analytics endpoints, and ETL integrations.",
            YearMonth.of(2025, 3),
            new ArrayList<>()),

        new TechItem("Spring Boot", "Backend", "spring-boot",
            "I use Spring Boot to build production-ready Java applications with integrated data persistence, REST APIs, and strong test coverage.",
            YearMonth.of(2025, 8),
            new ArrayList<>()),

        new TechItem("PostgreSQL", "Backend", "postgresql",
            "My primary database for analytics and warehousing. I design normalized schemas and dimensional models to support BI and reporting.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("dbt", "Backend", "dbt",
            "I use dbt for SQL-based data transformation, testing, and documentation. Enables maintainable pipelines for analytics datasets.",
            YearMonth.of(2025, 9),
            new ArrayList<>()),

        new TechItem("SQLAlchemy", "Backend", "sqlalchemy",
                "I use SQLAlchemy as my ORM for defining relational models and queries in my Python backend services, enabling clean database interactions and schema management.",
                YearMonth.of(2023, 8),
                new ArrayList<>()),

        new TechItem("BeautifulSoup", "Backend", "beautifulsoup",
            "I use BeautifulSoup for web scraping and HTML parsing to extract structured data from web pages for ETL pipelines and data collection projects.",
            YearMonth.of(2024, 1),
            new ArrayList<>()),

        // ------------------ DATA SCIENCE & MACHINE LEARNING ------------------
        new TechItem("Pandas", "Data Science & Machine Learning", "pandas",
            "My go-to library for data wrangling, feature engineering, and exploratory analysis. I use it extensively for ETL and data preparation in machine learning workflows.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("NumPy", "Data Science & Machine Learning", "numpy",
            "I use NumPy for efficient numerical computation, vectorization, and matrix manipulation in ETL and model development.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("scikit-learn", "Data Science & Machine Learning", "scikit-learn",
            "My preferred toolkit for prototyping ML models — regression, classification, and clustering. I apply it to predictive analytics and churn modeling.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("XGBoost", "Data Science & Machine Learning", "xgboost",
            "I use XGBoost for high-performance gradient boosting models in predictive analytics and classification problems, focusing on feature importance and interpretability.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("Matplotlib", "Data Science & Machine Learning", "matplotlib",
            "I use Matplotlib for detailed static visualizations and performance analysis of models and KPIs.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("Seaborn", "Data Science & Machine Learning", "seaborn",
            "Built on Matplotlib, Seaborn lets me create statistical plots for exploratory data analysis, correlation studies, and distribution insights.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("Plotly", "Data Science & Machine Learning", "plotly",
            "I use Plotly for interactive data visualization and dashboards that communicate analytics insights effectively.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        new TechItem("Jupyter Notebook", "Data Science & Machine Learning", "jupyter",
            "I use Jupyter Notebook for exploratory data analysis, experimentation, and clear presentation of machine learning workflows.",
            YearMonth.of(2023, 8),
            new ArrayList<>()),

        // ------------------ FRONTEND ------------------
        new TechItem("React", "Frontend", "react",
            "My framework of choice for creating modular, responsive UIs. I use it for portfolio dashboards and data visualization interfaces.",
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
            "I containerize all services for reproducible environments and smooth CI/CD deployments across dev and production.",
            YearMonth.of(2025, 6),
            new ArrayList<>()),

        new TechItem("AWS", "DevOps & Tools", "aws",
            "I use AWS services for authentication workflows and password reset functionality, leveraging cloud-based identity management for secure user operations. Expanding skills with S3, Lambda, ECS, and RDS for full-stack deployments.",
            YearMonth.of(2025, 3),
            new ArrayList<>()),

        new TechItem("GitHub Actions", "DevOps & Tools", "github-actions",
            "I automate tests, builds, and deployments using GitHub Actions, ensuring reliable and repeatable CI/CD pipelines.",
            YearMonth.of(2025, 3),
            new ArrayList<>()),

        new TechItem("Git", "DevOps & Tools", "git",
            "Used for version control and collaboration across all projects with branching and PR-based workflows in GitHub.",
            YearMonth.of(2022, 7),
            new ArrayList<>()),

        new TechItem("Pytest", "DevOps & Tools", "pytest",
            "I use Pytest for unit and integration testing to maintain code quality and catch regressions early in CI pipelines.",
            YearMonth.of(2024, 3),
            new ArrayList<>()),

        new TechItem("Postman", "DevOps & Tools", "postman",
            "I use Postman to test, document, and automate RESTful API requests and workflows during backend and data service development.",
            YearMonth.of(2024, 2),
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

    /**
     * Helper method to populate project associations for tech items
     * This avoids circular dependency by taking projects as a parameter
     */
    public List<TechItem> getAllTechItemsWithProjects(List<com.kyledarden.backend.model.Project> projects) {
        return techItems.stream()
                .map(techItem -> {
                    List<com.kyledarden.backend.model.Project> associatedProjects = projects.stream()
                            .filter(project -> project.getTechStack().stream()
                                    .anyMatch(tech -> tech.getId().equals(techItem.getSlug())))
                            .collect(java.util.stream.Collectors.toList());
                    
                    // Create a new TechItem with the populated projects
                    return new TechItem(
                            techItem.getName(),
                            techItem.getCategory(),
                            techItem.getSlug(),
                            techItem.getDescription(),
                            techItem.getStartDate(),
                            associatedProjects
                    );
                })
                .collect(java.util.stream.Collectors.toList());
    }
}