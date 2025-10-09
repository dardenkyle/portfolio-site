# CS2 Analytics

### Overview

**CS2 Analytics** is a data platform built to help players and analysts make **data-driven performance predictions** in competitive Counter-Strike.  
It transforms raw match data into structured, queryable insights using a **queue-based scraping and processing pipeline**, then exposes the results through a **documented API**.  
The project demonstrates strong backend, data engineering, and DevOps fundamentals — including modular design, reliability patterns, and production-ready tooling.

---

### Purpose

The goal of this project was to create a **production-style data platform** that demonstrates how I approach real-world engineering problems — data ingestion, transformation, and API delivery — using modern Python practices.  
It simulates the architecture of analytics and SaaS systems that handle high-volume, evolving datasets, with a focus on performance, maintainability, and reproducibility.

---

### Architecture & Implementation

The platform follows a **service-oriented architecture** with clearly separated responsibilities:

- **Scraping Service:**  
  Built with **Python + SeleniumBase**, it pulls live match pages into a queue system, managing concurrency, rate limits, and retries through idempotent jobs.

- **Parsing & Transformation:**  
  HTML data is parsed into structured tables using **Pandas**, then persisted to **PostgreSQL** via **SQLAlchemy** and **Alembic** migrations.  
  Supports incremental updates, deduplication, and schema versioning.

- **API Service:**  
  A **FastAPI** layer provides endpoints for players, matches, and derived analytics.  
  Endpoints include pagination, caching, and validation with automatic OpenAPI documentation.

- **Testing & CI/CD:**  
  Comprehensive **Pytest** coverage (80%+) and **GitHub Actions** automation ensure reliability and continuous integration.  
  **Docker Compose** standardizes local and cloud deployments.

---

### Technical Highlights

- Designed a **queue-based data pipeline** capable of scraping and processing 5,000+ match pages reliably.
- Engineered **resumable jobs** with exponential backoff to prevent data loss and rate-limit bans.
- Implemented **structured logging and request tracing** for observability.
- Automated full environment setup with **Docker** and **Alembic** migrations.
- Delivered **typed, validated REST APIs** for clean data access and integration.

---

### Results

- Achieved a **95%+ scraping stability rate** through persistent job states and error recovery.
- Normalized and stored over **5,000 matches** in relational tables ready for analysis and modeling.
- Delivered a **fully reproducible CI/CD pipeline** using Docker and GitHub Actions.
- Produced professional-level documentation and modular architecture aligned with industry standards.

---

### Future Work

- Add **replay parsing** for personalized player analytics.
- Implement **predictive models** (win probability, player ratings).
- Develop **interactive dashboards** for visualization and trend tracking.

---

### Stack

**Languages & Frameworks:** Python, FastAPI, SQLAlchemy, Alembic, Pandas, SeleniumBase  
**Database:** PostgreSQL  
**Testing & CI:** Pytest, GitHub Actions  
**Deployment:** Docker Compose, Render / AWS (planned)

---

### Key Takeaway

CS2 Analytics demonstrates how I approach **backend and data engineering challenges** with scalability, reliability, and clarity in mind.  
It highlights my ability to design **end-to-end systems** — from ingestion and processing to API delivery and testing — using modern Python tooling and production-ready practices.  
This project showcases the skill set I bring to a **Backend or Data Engineering** role.
