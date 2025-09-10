/**
 * Project returned by the API. Optional fields are omitted from JSON when null.
 */
package com.kyledarden.backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.time.OffsetDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class Project {
    private final String slug;
    private final String title;
    private final String summary;
    private final List<String> tags;

    private final String repoUrl;      // optional
    private final String liveUrl;      // optional
    private final Integer order;       // optional (for sorting)
    private final OffsetDateTime updatedAt; // optional (ISO 8601)
    private final String heroImage;    // optional
    private final String videoId;      // optional (YouTube id)

    /** Full constructor; pass null for optional fields. */
    public Project(
            String slug,
            String title,
            String summary,
            List<String> tags,
            String repoUrl,
            String liveUrl,
            Integer order,
            OffsetDateTime updatedAt,
            String heroImage,
            String videoId) {
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
    }

    public String getSlug() { return slug; }
    public String getTitle() { return title; }
    public String getSummary() { return summary; }
    public List<String> getTags() { return tags; }
    public String getRepoUrl() { return repoUrl; }
    public String getLiveUrl() { return liveUrl; }
    public Integer getOrder() { return order; }
    public OffsetDateTime getUpdatedAt() { return updatedAt; }
    public String getHeroImage() { return heroImage; }
    public String getVideoId() { return videoId; }
}
