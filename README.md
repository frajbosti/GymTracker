# GymTracker

[![CI/CD](https://github.com/frajbosti/GymTracker/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/frajbosti/GymTracker/actions/workflows/ci-cd.yml)

**Live app:** https://gymtracker-frajbosti.netlify.app (backend: https://gymtracker-backend-latest-kmez.onrender.com/api/health)

Plan workouts, record sets, and track progress. Trainers can assign programs and review results for members who accept their invitation.

Built with React, TypeScript, Express, Prisma, and PostgreSQL.

## Run locally

**Requirements:** Node.js 22.12+, npm, and Docker with Compose.

### 1. Install and configure

From the repository root:

```sh
npm ci
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set `JWT_SECRET` in `backend/.env` to a random secret of at least 32 characters. You can generate one with:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

### 2. Set up the database

Start Docker, then run:

```sh
npm run db:generate
npm run db:up
npm run db:migrate
npm run db:seed
```

If port `5432` is occupied, create a root `.env` file containing `POSTGRES_PORT=5433` and change the port in both database URLs in `backend/.env` to `5433`.

### 3. Start the app

```sh
npm run dev
```

Open **[localhost:5173](http://localhost:5173)**. The API runs at `http://localhost:3000`. Use `localhost` for both services.

Create an account, optionally checking **Register as a trainer**, or sign in with a seeded account:

| Account | Email |
| --- | --- |
| Member | `member@gymtracker.local` |
| Trainer | `trainer@gymtracker.local` |
| Admin | `admin@gymtracker.local` |

Seeded accounts use `SEED_PASSWORD` from `backend/.env` (default: `GymTracker-dev-123!`).

### Next time

```sh
npm run db:up
npm run db:migrate
npm run dev
```

After pulling schema changes, also run `npm run db:generate`. Stop the app with `Ctrl+C`; use `npm run db:down` to stop PostgreSQL while keeping its data.

## Development

| Command | Purpose |
| --- | --- |
| `npm run lint` | Check code with Biome |
| `npm test` | Run unit and component tests |
| `npm run test:coverage` | Run tests with a coverage report |
| `npm run typecheck` | Check TypeScript |
| `npm run build` | Build both apps |

Project design and architecture are in [docs](docs/).


## CI/CD pipeline

The GitHub Actions workflow [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) runs on every pull request to `main` and on every push to `main`. A pull request can be merged only when `lint`, `build` and `test` pass.

| Job | What it does |
| --- | --- |
| `lint` | Checks frontend and backend code with Biome (`npm run lint`). |
| `build` | Builds the frontend (Vite) and backend (TypeScript) with a cached npm install, and uploads the results as artifacts (`frontend-dist`, `backend-dist`). |
| `test` | Runs frontend and backend tests with a coverage report (artifact `coverage-report`) and backend integration tests against a PostgreSQL service. |
| `deploy` | Runs only on push to `main` after the three jobs pass, in the `production` environment. Uploads the `frontend-dist` artifact to Netlify (which proxies `/api` to the backend) and packages the `backend-dist` artifact into a Docker image that Render deploys. The database runs on Neon. |
