# Movie Analytics ETL

### Overview

**Movie Analytics ETL** is an end-to-end **data engineering project** that processes raw IMDb datasets — over **176 million records** — into a clean, dimensional data warehouse using **PostgreSQL** and **dbt**.  
The project demonstrates expertise in **data modeling, transformation, and testing**, following modern data engineering best practices with production-grade reliability and documentation.

---

### Purpose

The goal of this project was to build a **realistic data engineering pipeline** that mirrors how modern analytics teams collect, transform, and serve data for business use.  
It emphasizes data quality, scalability, and reproducibility, transforming raw TSV files into **fact and dimension tables** for analytics, dashboards, and downstream modeling.

---

### Architecture & Implementation

The pipeline follows a **multi-layered architecture** built around dbt and PostgreSQL:

- **Raw Data Ingestion:**  
  Loaded 176M+ records from five IMDb TSV datasets into a raw schema.  
  Ingestion scripts (Python + psycopg2) detect environment and handle large-scale inserts efficiently.

- **Transformation (dbt Staging Models):**  
  dbt models handle type casting, null conversions, and orphaned records.  
  Each model is modular and testable, ensuring maintainable lineage from raw → staging → marts.

- **Data Warehouse (Dimensional Modeling):**  
  Implemented a **star schema** with 4 primary marts: `dim_titles`, `dim_people`, `fact_ratings`, and `bridge_cast_crew`.  
  Designed for analytical workloads like content trends, rating distributions, and generational analyses.

- **Testing & Data Quality:**  
  Over 30 dbt tests (uniqueness, relationships, null checks, business logic) with an 80%+ pass rate.  
  Referential integrity ensured across all dimension and fact tables.

- **Analytics & Visualization:**  
  Generated an **interactive HTML dashboard** using Python + Plotly, visualizing content trends, genre popularity, and rating distributions.

---

### Technical Highlights

- Processed **176M+ records** from IMDb’s public datasets into a normalized PostgreSQL warehouse.
- Designed **30+ dbt tests** for data quality and referential integrity (80%+ pass rate).
- Built a **complete star schema** for movies, people, ratings, and relationships.
- Automated ingestion and transformation with **Python, dbt, and Docker Compose**.
- Generated an **interactive dashboard** with 5 visualizations for trend analysis.
- Documented the entire pipeline with **dbt docs** for model lineage and schema clarity.

---

### Results

- Processed and validated:
  - **877K+ movies** and **352K+ TV series**
  - **14.7M+ people** with career metrics
  - **99K+ high-quality ratings** with statistical testing
- Achieved an **80%+ data quality pass rate** across all dbt tests.
- Delivered a **fully automated data pipeline** that runs end-to-end with reproducibility and observability.
- Provided **interactive analytical outputs** via a generated dashboard.

---

### Future Work

- **Performance Optimization:** Add database indexes and incremental dbt models for faster builds.
- **Advanced Analytics:** Explore collaboration networks and time-series forecasting for film industry trends.
- **Data Expansion:** Incorporate box office, awards, and reviews datasets.
- **Cloud Migration:** Migrate to managed services on AWS/GCP for scalability and orchestration.
- **API Layer:** Expose metrics via REST API for integration with external dashboards.

---

### Stack

**Languages & Tools:** Python, dbt, PostgreSQL, Docker Compose  
**Testing & CI/CD:** dbt tests, GitHub Actions, pre-commit hooks  
**Visualization:** Plotly, HTML Dashboards  
**Data Volume:** 176M+ records processed  
**Design Methodology:** Kimball-style dimensional modeling

---

### Key Takeaway

**Movie Analytics ETL** showcases my ability to engineer **large-scale, production-style data pipelines** with strong data quality and dimensional modeling practices.  
It demonstrates mastery in **ETL development, dbt modeling, testing frameworks, and analytics enablement**, aligning directly with modern **Data Engineering and Analytics Engineering** roles.
