# Verification

## Build and source checks

- `pnpm install --frozen-lockfile` completed successfully for all nine workspace projects.
- `pnpm run typecheck` passed for the shared libraries, artifacts, and scripts.
- `BASE_PATH=/predictive-equity/ pnpm --filter @workspace/predictive-equity run build` completed successfully.
- A production preview served from `/predictive-equity/` loaded the site, bundled illustration, favicon, and all three local font families. The browser made no external runtime-resource requests and reported no browser errors.

## Browser behavior

On the built portable page, a headless Chromium check verified:

- All five section links update the page fragment and reach an existing section.
- Both calculator sliders update their displayed values and recalculate the outputs. At 10% inflation and 25% absenteeism, the illustrative model displayed `$862,500` absenteeism cost, `$48,000` subsidy outlay, and `1103.0%` modeled net ROI.
- Each of the four offline-finance flow buttons changes its selected state and matching explanation.
- The five content sections, illustration, favicon, and self-hosted fonts load.

The current local Replit preview was also checked at 402 × 874 pixels. The production page and local preview were compared visually at a 1920 × 1080 desktop viewport; the hero, typography, color palette, illustration, navigation, and opening section matched.

## Current dependency audit

`pnpm audit` reports 16 findings in the existing locked workspace dependencies: 5 high, 7 moderate, 4 low, and 0 critical. Reported packages include Vite, Zod, Express transitive dependencies, and OpenAPI tooling. This export retains those lockfile versions to avoid silently changing the source dependency set; dependency remediation should be handled separately before using affected optional services or tooling in production.

The build emitted a non-blocking Vite source-map warning from the existing tooltip component; the production bundle was generated successfully.
