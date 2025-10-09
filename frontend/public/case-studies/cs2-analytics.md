# CS2 Analytics

## Overview

CS2 Analytics is a data platform built to help players and analysts make data-driven performance predictions in competitive Counter-Strike. It transforms raw match data into structured, queryable insights using a queue-based scraping and processing pipeline, then exposes this data through a documented API. The system demonstrates strong backend, data engineering, and DevOps fundamentals — including modular design, reliability patterns, and production-ready tooling.

## Purpose

The goal of this project was to build a production-style data platform that shows how I approach real engineering problems — data collection, transformation, and API delivery — using modern Python tooling and best practices. It simulates the kind of distributed, data-heavy backend systems used by analytics and SaaS companies, while focusing on performance, maintainability, and clear documentation.

## Architecture & Implementation

The platform follows a service-oriented architecture divided into four main components:

**Scraping Service:**
Built with Python + SeleniumBase, it pulls live match pages into a queue system, managing concurrency, rate limits, and recovery through idempotent jobs. Each job is logged and can resume from failure without losing state.

**Parsing & Transformation:**
HTML data is parsed into structured objects using Pandas and persisted to PostgreSQL through SQLAlchemy and Alembic. The schema supports incremental updates, versioned migrations, and deduplication.

**API Service:**
A FastAPI layer provides endpoints for players, matches, and analytics results. Endpoints include validation, pagination, and caching, and are fully documented via OpenAPI.

**Testing & CI/CD:**
Pytest enforces 80%+ coverage, and GitHub Actions runs linting, tests, and build verification on every push. Everything runs in Docker Compose, ensuring a reproducible local or cloud deployment.

## Technical Highlights

- Designed a queue-based data pipeline capable of scraping and processing 5K+ match pages reliably
- Engineered resumable job handling with exponential backoff to prevent data loss and rate-limit bans
- Implemented structured logging and request tracing for better debugging and observability
- Automated full environment setup with Docker, .env configuration, and Alembic migrations
- Delivered clean, REST-style API routes with input validation and schema-typed responses

## Results

- Stable scraping success rate of 95%+ with automated retries and integrity checks
- 5,000+ matches collected and normalized into relational datasets ready for analytics or ML modeling
- Fully reproducible CI/CD pipeline through GitHub Actions and Docker
- Delivered professional documentation, tests, and modular architecture consistent with industry standards

## Future Work

**Replay Parsing:** add local demo file ingestion for personalized gameplay analysis.

**Predictive Models:** build win-probability and player rating forecasts using the structured match data.

**Visualization Layer:** expose analytics through dashboards and interactive graphs for player or team tracking.

## Stack

**Languages & Frameworks:** Python, FastAPI, SQLAlchemy, Alembic, Pandas, SeleniumBase

**Database:** PostgreSQL

**Testing & CI:** Pytest, GitHub Actions

**Deployment:** Docker Compose, Render / AWS (planned)

## Key Takeaway

CS2 Analytics demonstrates how I approach backend and data engineering challenges with scalability, reliability, and clarity in mind. It highlights the ability to design end-to-end systems — from data ingestion and processing to API delivery and testing — using modern Python tooling and production-grade practices. This project represents how I'd contribute as a Backend or Data Engineer in a professional environment.

---

## Project Links

**[View Source Code](https://github.com/dardenkyle/CS2-analytics)** - Complete implementation with documentation

**[Live Demo](#)** - Interactive analytics dashboard
