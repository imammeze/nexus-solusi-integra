# Integrated Corporate Company Profile

Website company profile modern untuk perusahaan konsultan yang bergerak di tiga pilar utama: **Konsultan Keuangan**, **Manajemen Bisnis**, dan **Teknologi Informasi (IT)**.

## Tech Stack

| Layer     | Technology            |
| --------- | --------------------- |
| Frontend  | Next.js 16 (App Router) |
| Backend   | NestJS 11             |
| Database  | PostgreSQL 18.3       |
| ORM       | Prisma                |
| Monorepo  | Turborepo + pnpm      |

## Project Structure

```
my-fullstack-app/
├── apps/
│   ├── frontend/       # Next.js 16 (App Router)
│   └── backend/        # NestJS 11 (Headless CMS / API)
├── packages/
│   ├── types/          # Shared TypeScript Types & DTOs
│   └── tsconfig/       # Shared TypeScript Configurations
├── turbo.json          # Turborepo pipeline config
├── pnpm-workspace.yaml # Workspace definition
└── package.json        # Root package
```

## Getting Started

### Prerequisites

- Node.js >= 20.9
- pnpm >= 9.0
- PostgreSQL >= 18

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp apps/backend/.env.example apps/backend/.env

# 3. Update database URL in apps/backend/.env

# 4. Generate Prisma client
pnpm db:generate

# 5. Run database migrations
pnpm db:migrate

# 6. Start development servers
pnpm dev
```

### Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start all dev servers                |
| `pnpm build`       | Build all apps & packages            |
| `pnpm lint`        | Lint all apps & packages             |
| `pnpm db:generate` | Generate Prisma client               |
| `pnpm db:migrate`  | Run database migrations              |
| `pnpm db:push`     | Push schema to database (no migration) |
| `pnpm db:studio`   | Open Prisma Studio                   |

### Development URLs

| Service  | URL                          |
| -------- | ---------------------------- |
| Frontend | http://localhost:3000        |
| Backend  | http://localhost:4000/api    |
| Prisma Studio | http://localhost:5555   |
