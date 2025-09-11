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

    private final String repoUrl;      // optional repository URL
    private final String liveUrl;      // optional live/demo URL
    private final Integer order;       // optional (for sorting)
    private final OffsetDateTime updatedAt; // optional (ISO 8601)
    private final String heroImage;    // optional hero image (banner) URL
    private final String videoId;      // optional (YouTube id)

    private final String overview; // High-level Markdown/text overview for the detail page.
    private final List<TechItem> techStack; // Detailed tech stack for the detail page.
    private final List<Challenge> challenges; // Ordered challenges solved by the project.

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
            String videoId,
            String overview,
            List<TechItem> techStack,
            List<Challenge> challenges) {
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
        this.techStack = techStack;
        this.challenges = challenges;
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
    public String getOverview() { return overview; }
    public List<TechItem> getTechStack() { return techStack; }
    public List<Challenge> getChallenges() { return challenges; }

    /** Technology used by the project (for badges/links). */
    public static final class TechItem {
        private final String id;
        private final String name;
        private final String category; // e.g., Backend, Database, Infra
        private final String url;      // docs/homepage
        private final Integer order;   // sort hint (lower = earlier)
        public TechItem(String id, String name, String category, String url, Integer order) {
        this.id = id; this.name = name; this.category = category; this.url = url; this.order = order;
        }
        public String getId() { return id; }
        public String getName() { return name; }
        public String getCategory() { return category; }
        public String getUrl() { return url; }
        public Integer getOrder() { return order; }
    }

    /** Link associated with a challenge (PR, doc, ticket). */
    public static final class Link {
      private final String label;
      private final String url;
      public Link(String label, String url) { this.label = label; this.url = url; }
      public String getLabel() { return label; }
      public String getUrl() { return url; }
    }
    
    /** A challenge and its solution for the “Challenges & Solutions” section. */
    public static final class Challenge {
      private final String id;
      private final String title;
      private final String context;   // optional
      private final String solution;  // required
      private final String impact;    // optional
      private final List<Link> links; // optional
      private final List<String> tags;// optional
      private final Integer order;    // sort hint
      public Challenge(
          String id, String title, String context, String solution, String impact,
          List<Link> links, List<String> tags, Integer order) {
        this.id = id; this.title = title; this.context = context; this.solution = solution; this.impact = impact;
        this.links = links; this.tags = tags; this.order = order;
      }
      public String getId() { return id; }
      public String getTitle() { return title; }
      public String getContext() { return context; }
      public String getSolution() { return solution; }
      public String getImpact() { return impact; }
      public List<Link> getLinks() { return links; }
      public List<String> getTags() { return tags; }
      public Integer getOrder() { return order; }
    }
}

