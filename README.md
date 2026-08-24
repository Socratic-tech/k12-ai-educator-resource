# K-12 AI Educator Resource

A free, public, vendor-neutral resource that helps K-12 educators build practical AI literacy, find role-specific guidance, and create safer, more useful prompts without sending information to an AI service.

## What is included

- Short five- and twenty-minute AI catch-up guides
- Role and subject pathways for K-12 educators
- Eight deterministic prompt-building workflows
- Optional browser-only educator profiles that prefill relevant context
- Guidance for student AI use, privacy, review, and professional judgment

The prompt builders run entirely in the browser. They assemble educator-provided context into structured text that can be reviewed and copied into an institution-approved AI system. The application does not call an AI API or collect student information.

## Local development

Requirements:

- Node.js `>=22.13.0`
- npm and the committed `package-lock.json`

```bash
npm ci
npm run dev
```

Useful checks:

```bash
npm run lint
npm test
```

`npm test` creates a production build and then runs the domain and rendered-page test suites. The generated application is a Cloudflare Worker-compatible vinext bundle in `dist/`.

## Application shape

- `app/`: routes, layouts, and global styles
- `components/`: reusable page, profile, pathway, and prompt-builder UI
- `content/`: educator-facing guides and pathway content
- `data/`: prompt templates and profile choices
- `lib/`: prompt generation, personalization, profile storage, and metadata helpers
- `tests/`: domain, hardening, and rendered HTML coverage

## Data and services

- Required environment variables: none
- AI API: none
- Database or object storage: none
- Account requirement: none
- Profile persistence: browser `localStorage` only

Do not enter names, student IDs, identifiable grades, health information, IEP or 504 documents, disciplinary records, or other personally identifiable information into a prompt builder.

## Deployment

The repository includes Cloudflare Worker-compatible vinext configuration in `vite.config.ts`, `wrangler.jsonc`, and `.openai/hosting.json`. See `docs/deployment-readiness.md` for runtime assumptions, outstanding launch decisions, and the production verification checklist.
