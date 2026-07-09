# FreightFolio

### Overview

**FreightFolio** is a logistics SaaS platform built for small and mid-sized trucking carriers to **reduce reliance on spreadsheets** and **automate daily operational tasks** such as load tracking, invoicing, and payment reconciliation.

It’s an **in-development**, production-style backend system showcasing **multi-tenant architecture**, **modular FastAPI services**, and **production-grade AWS Cognito authentication** - similar to the kind of software powering real logistics and ERP platforms. The source is private; a public overview repo describes the system, and code walkthroughs are available on request.

---

### Purpose

The goal of FreightFolio was to create a backend-driven SaaS product that demonstrates my ability to architect, document, and deploy **scalable, data-heavy applications** that solve real business problems.

It bridges backend engineering and business process automation — replacing fragmented workflows with structured data models and automated logic for freight management, billing, and customer visibility.

---

### Architecture & Implementation

FreightFolio is composed of several independent services tied together through a **shared PostgreSQL instance** and **modular service layer**:

- **Core API (FastAPI):**  
  Handles tenants, loads, invoices, and user authentication.  
  Endpoints follow REST conventions with full OpenAPI documentation and Pydantic-based validation.

- **Data Model & Persistence:**  
  A multi-tenant **PostgreSQL** design with tenant-scoped data and **per-service Alembic migrations** supports safe schema evolution without data overlap.  
  The ORM layer uses **SQLAlchemy 2.0** with typed models and foreign key constraints to preserve relational integrity.

- **Background Automation:**  
  Periodic jobs handle invoice generation, payment reminders, and load status updates.  
  These processes simulate the automation layer found in real TMS (Transportation Management Systems).

- **Authentication & Security:**  
  Implements **AWS Cognito**-based authentication (RS256 JWT verification with JWKS caching and key rotation), role-based permissions, and middleware for secure route access.

- **CI/CD & Testing:**  
  Uses **Pytest** for unit and integration testing, with **GitHub Actions** CI in progress.  
  Each service includes Dockerfiles for consistent containerized builds; the system is not yet deployed to a cloud environment.

---

### Technical Highlights

- Built a **multi-tenant SaaS backend** capable of supporting separate carrier accounts and isolated data.
- Engineered **per-service Alembic migrations**, ensuring modular and safe schema evolution.
- Implemented **AWS Cognito authentication** and role-based access control for multi-user workflows.
- Automated **invoicing, payment tracking, and document generation** via scheduled background tasks.
- Employed structured logging and environment-based configuration in preparation for cloud deployment.

---

### Results

- In-development backend simulating the operations of a logistics SaaS platform, with load, invoice, and auth services functional.
- **Reduced spreadsheet dependency** by automating load management, invoice creation, and payment tracking.
- Pytest unit and integration tests cover routes and services.
- Modular architecture allows each domain (loads, invoices, payments) to evolve independently or scale into microservices.
- Documented with clear API specs and onboarding guides for future integration with a frontend or third-party dashboard.
- Simple dashboard that displays some KPIs, this will be expanded on in later versions.

---

### Future Work

- **Expand analytics dashboards** to visualize loads, revenue, and customer data.
- **Integrate third-party APIs** (e.g., route optimization or carrier load boards).
- **Introduce event-driven workflows** (e.g., via AWS Lambda or Celery for async automation).
- **Refactor for serverless deployment** to demonstrate modern infrastructure design using AWS.

---

### Stack

**Languages & Frameworks:** Python, FastAPI, SQLAlchemy, Alembic, Pydantic  
**Auth:** AWS Cognito (with SES for transactional email)  
**Database:** PostgreSQL  
**Testing & CI/CD:** Pytest; GitHub Actions CI in progress  
**Deployment:** Docker Compose locally; cloud deployment planned, not yet live

---

### Key Takeaway

FreightFolio demonstrates how I build **production-ready backend systems** that automate real business workflows.  
It reflects strong skills in **API design, data modeling, DevOps, and system modularity** — the same skills required for backend or platform engineering roles.

The project mirrors the architecture of real SaaS logistics products and serves as a concrete example of my ability to design, document, and deploy reliable backend software.
