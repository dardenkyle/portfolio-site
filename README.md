[![CI](https://github.com/dardenkyle/portfolio-site/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/dardenkyle/portfolio-site/actions/workflows/ci.yml)
[![QA Tests](https://github.com/dardenkyle/site-sentry/actions/workflows/tests.yml/badge.svg)](https://github.com/dardenkyle/site-sentry/actions/workflows/tests.yml)
[![Deploy](https://github.com/dardenkyle/portfolio-site/actions/workflows/deploy-frontend.yml/badge.svg)](https://github.com/dardenkyle/portfolio-site/actions/workflows/deploy-frontend.yml)
[![Last Commit](https://img.shields.io/github/last-commit/dardenkyle/portfolio-site/main)](https://github.com/dardenkyle/portfolio-site/commits/main)

# Portfolio

Full-stack portfolio site with a **Spring Boot (Java 21)** backend and a **Vite + React + TypeScript** frontend.
<br>The goal is to showcase both backend and frontend engineering skills in a clean, production-style project.

## Tech

### Backend

- Java 21, Spring Boot
- Gradle
- REST API endpoints: Health, Projects, Contact, Hello

### Frontend

- Node.js 18+ (tested on v23.10.0)
- Vite, React, TypeScript
- React Router
- ESLint + Prettier
- (Future) TanStack Query, Zustand, CI/CD

## Getting Started

### Prerequisites

- Java 21
- Node.js 18+ (tested on v23.10.0)
- npm
- Gradle (wrapper included)

### Backend

```
cd backend
./gradlew bootRun
```

Backend will be available at `http://localhost:8080`

### Frontend

```
cd frontend
npm ci
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Scripts

### Backend

- `./gradlew bootRun` -- run Spring Boot app
- `./gradlew test` -- run tests
- `./gradlew build` -- build JAR

### Frontend

- `npm run dev` — start dev server
- `npm run typecheck` — TypeScript project build check
- `npm run build` — typecheck + Vite build
- `npm run lint` — ESLint

## API Endpoints

Base URL: `http://localhost:8080/api`

| Method | Endpoint    | Description              |
| ------ | ----------- | ------------------------ |
| GET    | `/health`   | Health check for the API |
| GET    | `/projects` | Fetch all projects       |
| GET    | `/hello`    | Simple demo endpoint     |
| POST   | `/contact`  | Submit a contact request |

## Structure

```
backend/
├── build.gradle
├── settings.gradle
├── gradlew*
├── src/
│   ├── main/java/com/kyledarden/backend/
│   │   ├── BackendApplication.java
│   │   ├── controller/
│   │   │   ├── ContactController.java
│   │   │   ├── HealthController.java
│   │   │   ├── HelloController.java
│   │   │   └── ProjectController.java
│   │   ├── model/
│   │   │   ├── ContactRequest.java
│   │   │   └── Project.java
│   │   └── service/
│   │       ├── ContactService.java
│   │       └── ProjectService.java
│   └── test/java/com/kyledarden/backend/
│       └── BackendApplicationTests.java

frontend/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── App.css
    ├── index.css
    ├── routes.tsx
    ├── pages/
    │   ├── Home.tsx
    │   ├── About.tsx
    │   └── NotFound.tsx
    ├── ui/
    │   └── Layout.tsx
    └── utils/
        └── hello.ts

```

## Conventions

- Branch per feature; squash merge to `main`
- Conventional commits (e.g., `chore: cleanup boilerplate`)

## Contact

- Email: [darden_kyle@hotmail.com](mailto:darden_kyle@hotmail.com)
- LinkedIn: [linkedin.com/in/kyle-darden](https://www.linkedin.com/in/kyle-darden/)
- GitHub: [github.com/dardenkyle](https://github.com/dardenkyle)

## License

[MIT](LICENSE)
