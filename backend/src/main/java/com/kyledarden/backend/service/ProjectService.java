package com.kyledarden.backend.service;

import com.kyledarden.backend.model.Project;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final List<Project> projects = List.of(
        new Project("cs2-analytics", "CS2 Analytics Platform",
            "Queue-based scraping, PostgreSQL storage, analytics API.",
            "https://github.com/youruser/cs2-analytics", null,
            new String[]{"Java", "Spring Boot", "PostgreSQL"}),

        new Project("freightfolio", "FreightFolio (Logistics SaaS)",
            "Load manager, invoices, AR/AP, Cognito auth, AWS-ready.",
            "https://github.com/youruser/freightfolio", "https://demo.example",
            new String[]{"Java", "Spring Boot", "AWS"})
    );

    public List<Project> all() {
        return projects;
    }
}
