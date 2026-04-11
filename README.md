# AllNovas Monorepo

This repository is a **npm workspaces monorepo** containing all AllNovas frontend applications.

---

## Apps

| App | Path | Port | Description |
|-----|------|------|-------------|
| `@repo/main` | `apps/main` | 5173 | AllNovas main platform (freelance marketplace) |
| `@repo/learning` | `apps/learning` | 5174 | LearnHub — course & learning management app |

---

## Getting Started

Install all dependencies from the root (npm hoists shared packages):

```bash
npm install
```

### Run an app

```bash
# Main platform
npm run dev:main

# Learning app
npm run dev:learning
```

### Build

```bash
# Build all apps
npm run build

# Build a specific app
npm run build:main
npm run build:learning
```

---

## Structure

```
/
├── apps/
│   ├── main/        # AllNovas main platform
│   └── learning/    # LearnHub learning app
├── package.json     # Root workspace config
└── README.md
```
---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Bundler:** Vite
- **Package Manager:** npm workspaces

---

## Add a New App

1. Create the app folder under `apps/`:

```bash
mkdir -p apps/new-app/src
```

2. Add app files (`apps/new-app/package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `src/App.tsx`).

3. Set the app package name and scripts in `apps/new-app/package.json`:

```json
{
	"name": "@repo/new-app",
	"private": true,
	"scripts": {
		"dev": "vite --port 5175",
		"build": "tsc -b && vite build",
		"preview": "vite preview --port 4175"
	}
}
```

4. Add root scripts in `package.json`:

```json
{
	"scripts": {
		"dev:new-app": "npm run dev --workspace=apps/new-app",
		"build:new-app": "npm run build --workspace=apps/new-app"
	}
}
```

5. Install dependencies from the repo root:

```bash
npm install
```

6. Run the new app:

```bash
npm run dev:new-app
```
