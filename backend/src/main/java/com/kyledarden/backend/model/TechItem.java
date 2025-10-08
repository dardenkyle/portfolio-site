package com.kyledarden.backend.model;

import java.time.LocalDate;
import java.time.Period;
import java.time.YearMonth;
import java.util.List;

public class TechItem {
    private String name;
    private String category;
    private String slug;
    private String description;
    private YearMonth startDate;
    private List<Project> projects;

    public TechItem() {}

    public TechItem(String name, String category, String slug, String description, YearMonth startDate, List<Project> projects) {
        this.name = name;
        this.category = category;
        this.slug = slug;
        this.description = description;
        this.startDate = startDate;
        this.projects = projects;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public YearMonth getStartDate() {
        return startDate;
    }

    public void setStartDate(YearMonth startDate) {
        this.startDate = startDate;
    }

    // Calculate experience dynamically
    public String getExperience() {
        if (startDate == null) {
            return "N/A";
        }
        
        // Convert YearMonth to LocalDate (first day of the month) for calculation
        LocalDate startLocalDate = startDate.atDay(1);
        Period period = Period.between(startLocalDate, LocalDate.now());
        int years = period.getYears();
        
        // If less than 1 year, show "1 year"
        if (years == 0) {
            return "1 year";
        }
        
        // Otherwise show "X+ years"
        return years + "+ years";
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}