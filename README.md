# Predictive Equity Research Dashboard

Portable source snapshot of the **Predictive Equity** research site. It preserves the current research page and its interactive features while adding local-run and static-hosting defaults. The original Replit project is not changed by this export.

## Project overview

The site presents Leen Amer Mohammed's research proposal, “Predictive Equity: Integrating Actuarial Risk Modeling and Offline FinTech Systems to Mitigate the Pink Tax and Period Poverty.” It includes the complete essay, a conceptual actuarial calculator, a clickable four-step offline-finance flow, and an operational and financial comparison matrix.

The calculator uses transparent illustrative assumptions; it does not display observed data or make empirical claims.

## Technology

- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4
- pnpm 10 workspace and lockfile
- Express 5 for the optional API-server artifact
- Drizzle and PostgreSQL packages in the optional shared database library

The dashboard itself is a static frontend. It does not call an API, require a database, or need authentication. Its fonts and illustration are included locally.

## Requirements

- Node.js 24 or newer
- Corepack and pnpm 10.26.1

## Install and run locally

From the extracted project root:

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm --filter @workspace/predictive-equity run dev
```

Open the local address printed by Vite (by default, `http://localhost:5173/`).

Useful checks:

```sh
pnpm run typecheck
pnpm --filter @workspace/predictive-equity run build
pnpm audit
```

The production frontend files are written to `artifacts/predictive-equity/dist/public/`.

The optional API service can be started separately with `PORT=8080 pnpm --filter @workspace/api-server run dev`; its current health endpoint is `GET /api/healthz`. It does not provide content or data to the dashboard.

## Deploy as a static site

For a root-domain static host:

```sh
BASE_PATH=/ pnpm --filter @workspace/predictive-equity run build
```

Publish the contents of `artifacts/predictive-equity/dist/public/`. For a subpath host, set `BASE_PATH` to that path with leading and trailing slashes, for example `/research/`.

An optional GitHub Pages workflow is included at `.github/workflows/deploy-pages.yml`. It builds for the repository subpath and deploys the static output when code is pushed to `main`. In the GitHub repository, enable Pages and select **GitHub Actions** as the source. If the default branch is not `main`, update the workflow branch.

## Environment variables and services

| Variable | Needed for | Default / notes |
| --- | --- | --- |
| `PORT` | Local frontend dev server | `5173` |
| `BASE_PATH` | Static builds served from a subpath | `/` |
| `PORT` | Optional API server | Set a free local port, such as `8080` |
| `DATABASE_URL` | Only if using the shared Drizzle database helper | PostgreSQL connection string; not required by the dashboard or its current health endpoint |

`.env.example` documents these values; it is a reference file and is not automatically loaded by the scripts. Export the values in your shell before running a command when you need to override a default.

The dashboard has no external API, login provider, or other runtime service dependency. Font files are bundled under `artifacts/predictive-equity/src/assets/fonts/`; their Open Font License texts are in `docs/source-materials/font-licenses/`.

## Project layout

```text
artifacts/
  predictive-equity/   Main responsive research website
  api-server/          Optional Express API artifact (currently health endpoint only)
  mockup-sandbox/      Component preview artifact
lib/
  api-client-react/    Generated React API client
  api-spec/            OpenAPI source and code generation
  api-zod/             Generated Zod schemas
  db/                  Drizzle/PostgreSQL library
scripts/               Workspace utility scripts
docs/
  source-materials/    Original research paper, website brief, and source illustration
```

`PROJECT_STRUCTURE.txt` contains the full file-by-file inventory included in this archive.

## Portability notes and limitations

- The dashboard's visual design and application logic are preserved. The portable copy changes only its development/build defaults, asset paths, and font loading so it runs outside Replit and works from a GitHub Pages subpath. Unused Replit-only Vite plugins for this dashboard and the unused root connectors SDK were removed from the copied manifests; the optional mockup sandbox still retains its preview tooling.
- The archive includes all tracked workspace source and configuration files, but intentionally excludes `.git` history, `node_modules`, generated build output, and credentials. Start a new Git repository after extraction if you want to push it to GitHub.
- The optional API and mockup-sandbox artifacts are included as source. The dashboard does not depend on either. The mockup sandbox retains its Replit-oriented preview tooling.
- No live PostgreSQL data or secrets are exported. The current database schema contains no application tables. The API server currently exposes a health check; it is not a data backend for this dashboard.
- The supplied illustration is included as provided. Its original licensing information was not included with the file.
- The bilingual author line uses the operating system's fallback serif font for Arabic glyphs.
- The locked dependency set currently reports 16 package advisories (5 high, 7 moderate, 4 low, and no critical findings) with `pnpm audit`. Findings include transitive tooling and optional workspace services. The lockfile is retained rather than upgrading dependencies in this source-preserving export; review and patch dependencies before publishing the optional API service or preview tooling.

See `docs/VERIFICATION.md` for build, browser, deployment-comparison, and audit results.

## Source materials

The original essay PDF, the prompt used to create the website, and the original community illustration are included in `docs/source-materials/`. The illustration used by the site is also in `artifacts/predictive-equity/public/`.
