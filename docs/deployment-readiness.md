# Deployment readiness

Reviewed August 18, 2026.

## Build and output

- Install: `npm install` (or `npm ci` when using the committed lockfile in CI).
- Production build: `npm run build`.
- Expected output: a Cloudflare Worker-compatible vinext bundle in `dist/`, including `dist/server/index.js`, static assets, and staged hosting metadata.
- Validation: `npm test` runs a production build and the Node test suite; `npm run lint` runs ESLint separately.

## Runtime assumptions

- Node.js `>=22.13.0`, as declared in `package.json`.
- npm and the existing `package-lock.json`; do not switch package managers for launch.
- The application is not a fully static export. It uses vinext React Server Components and request headers to build absolute social-image metadata, so deploy it with the generated server/worker runtime.
- Client-side profile preferences use browser `localStorage`; no account or hosted persistence is required.

## Environment and services

- Required environment variables: none.
- AI API: none.
- Database or object storage: none; `.openai/hosting.json` declares both D1 and R2 as `null`.
- Uploaded files: none.

## Existing deployment configuration

- `.openai/hosting.json`: Sites hosting bindings; no project ID is present because Sites is unavailable in this workspace.
- `vite.config.ts`: vinext, Sites, and Cloudflare build plugins with Worker-compatible output.
- `next.config.ts`: existing framework configuration.
- `package.json`: Node engine and build/test/start scripts.

## Recommended Vercel setup

1. Import the repository and preserve npm plus Node.js 22.
2. Use `npm run build` as the build command and leave environment variables empty.
3. Confirm Vercel recognizes the vinext/Vite output. This project is currently validated for Cloudflare Worker-compatible Sites output, not for Vercel’s native Next.js runtime.
4. If Vercel does not support the generated `dist/server/index.js` worker directly, use a Cloudflare Workers-compatible deployment target or perform a bounded platform-adapter evaluation on Day 4. Do not add Vercel-specific code until that compatibility check requires it.
5. After deployment, verify every route, dynamic prompt workflow, Open Graph tags, clipboard behavior, local-profile storage, and phone layouts on the production origin.

## External blockers

- Sites cannot be enabled or deployed from the current workspace. This is a workspace hosting limitation, not an application failure.
- A production domain and access policy have not been supplied.
- A monitored feedback destination has not been supplied; the app currently prepares a copyable feedback summary without collecting data.
- Vercel compatibility is not yet proven because the accepted app uses vinext/Cloudflare Worker output rather than standard Next.js build output.
- Human editorial review remains outstanding for copyright, policy, cultural, translation, age-appropriateness, and discipline-specific claims listed in the Day 3 inventory.
