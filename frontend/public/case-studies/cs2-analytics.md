# CS2 Analytics

## Overview

CS2 Analytics is a data platform built to help players and analysts make data-driven performance predictions in competitive Counter-Strike. It transforms raw match data into structured, queryable insights using a scraping and processing pipeline backed by PostgreSQL ingestion-state tables, then exposes this data through a documented API. The system is deployed end to end - a FastAPI service on Render serves player statistics from the production database to a public React dashboard on GitHub Pages - and demonstrates strong backend, data engineering, and DevOps fundamentals, including modular design, reliability patterns, and production-ready tooling.

## Purpose

The goal of this project was to build a production-style data platform that shows how I approach real engineering problems — data collection, transformation, and API delivery — using modern Python tooling and best practices. It simulates the kind of distributed, data-heavy backend systems used by analytics and SaaS companies, while focusing on performance, maintainability, and clear documentation.

## Architecture & Implementation

The platform follows a service-oriented architecture divided into five main components:

**Scraping Service:**
Built with Python + SeleniumBase, it pulls live match pages through PostgreSQL-backed ingestion-state tables, managing rate limits and recovery through idempotent jobs with retry/backoff and browser session recovery. Each job is logged and can resume from failure without losing state.

**Parsing & Transformation:**
HTML data is parsed into structured objects using BeautifulSoup and persisted to PostgreSQL through SQLAlchemy and Alembic. The schema supports incremental updates, versioned migrations, and deduplication.

**API Service:**
A FastAPI layer serves player statistics publicly, with validation and schema-typed responses, fully documented via OpenAPI ([live API docs](https://cs2-analytics.onrender.com/docs)).

**Frontend:**
A React + TypeScript + Vite dashboard, deployed to GitHub Pages, presents top-player statistics served live from the production database.

**Testing & CI/CD:**
A 130+ test Pytest suite runs in GitHub Actions on every push alongside Ruff linting and Mypy type checks, and the frontend has its own CI and deploy workflows. Docker Compose provides a reproducible container runtime.

## Technical Highlights

- Designed a resilient scraping pipeline with ingestion-state tracking for match, map, and demo workflow stages
- Engineered resumable job handling with retry/backoff and browser session recovery to prevent data loss and rate-limit bans
- Implemented structured logging and lifecycle tracking for better debugging and observability
- Automated full environment setup with Docker, .env configuration, uv-locked dependencies, and Alembic migrations
- Delivered clean, REST-style API routes with input validation and schema-typed responses

## Results

- Deployed end to end: public dashboard on GitHub Pages backed by a live FastAPI service on Render and a production PostgreSQL database
- Professional match, map, and player data collected and normalized into relational datasets ready for analytics or ML modeling
- 130+ backend tests (Pytest) with linting and type checks running in CI on every push; the frontend is gated by its own build-and-lint CI workflow
- Delivered professional documentation, tests, and modular architecture consistent with industry standards

## Future Work

**Replay Parsing:** add demo file download and parsing for deeper per-round analysis (stage boundary already in place).

**dbt Transformation Layer:** add dbt models downstream of ingestion for analytics-ready marts.

**Airflow Orchestration:** orchestrate the pipeline once dbt and clean stage boundaries are in place.

## Stack

**Languages & Frameworks:** Python, FastAPI, SQLAlchemy, Alembic, SeleniumBase, BeautifulSoup, React, TypeScript, Vite

**Database:** PostgreSQL

**Testing & CI:** Pytest, Ruff, Mypy, GitHub Actions

**Deployment:** Docker Compose; FastAPI on Render, frontend on GitHub Pages

## Key Takeaway

CS2 Analytics demonstrates how I approach backend and data engineering challenges with scalability, reliability, and clarity in mind. It highlights the ability to design end-to-end systems — from data ingestion and processing to API delivery and testing — using modern Python tooling and production-grade practices. This project represents how I'd contribute as a Backend or Data Engineer in a professional environment.

---

## Project Links

**[View Source Code](https://github.com/dardenkyle/CS2-analytics)** - Complete implementation with documentation

**[Live Demo](https://dardenkyle.github.io/CS2-analytics/)** - Public dashboard served live from the production database (the free-tier API can take ~30 seconds to wake after idle periods)
