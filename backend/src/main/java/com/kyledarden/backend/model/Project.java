package com.kyledarden.backend.model;

public record Project(
    String slug,
    String title,
    String summary,
    String repoUrl,
    String liveUrl,
    String[] tags
) {}
