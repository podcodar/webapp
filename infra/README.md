# Infrastructure (Pulumi + Cloudflare)

Stack-based Infrastructure as Code for provisioning Cloudflare Workers.

---

## Stack

| Stack               | Domain             | Use case                     |
| ------------------- | ------------------ | ---------------------------- |
| `webapp.dev`        | `dev.podcodar.org` | Preview / PR deployments     |
| `webapp.production` | `podcodar.org`     | Production (merge to `main`) |

---

## Prereqs

1. **Pulumi CLI** — `curl -fsSL https://get.pulumi.com | sh` (or `brew install pulumi`)
2. **Bun** — `brew install oven-sh/node/bun`
3. **Cloudflare account** with:
   - `CLOUDFLARE_API_TOKEN` — scoped to Workers & Zone (not Global Key)
   - `accountId` — Found in Cloudflare Dashboard → Workers & Pages → Overview
   - `zoneId` — Found in Cloudflare Dashboard → Domain → Overview

4. **Pulumi access token** — `pulumi login` then `pulumi org`, or create at [app.pulumi.com](https://app.pulumi.com)

---

## Secrets

All secrets live in the stack config, **never** in code.

### Why secrets.yaml?

`Pulumi.*.yaml` files are encrypted at rest via `encryptionsalt`. The raw `secure:` values are only readable by you. However, **never commit `secure:` values that are real** — treat them like passwords.

### Required secrets

| Key                | Where to get it                           |
| ------------------ | ----------------------------------------- |
| `webapp:accountId` | Cloudflare Dashboard → Workers → Overview |
| `webapp:zoneId`    | Cloudflare Dashboard → Domain → Overview  |

### Setting secrets (local)

```bash
# From the infra/ directory
cd infra

# Set plain config
pulumi config set accountId YOUR_ACCOUNT_ID

# Set secret (encrypted in Pulumi.*.yaml)
pulumi config set zoneId YOUR_ZONE_ID --secret
```

### Reading secrets

```bash
# Reveal a secret (prints to stdout — be careful)
pulumi config get zoneId --show-secrets
```

### CI/CD secrets

In GitHub → Repo Settings → Secrets:

| Secret                 | Description                                   |
| ---------------------- | --------------------------------------------- |
| `PULUMI_ACCESS_TOKEN`  | Pulumi token for CI login                     |
| `CLOUDFLARE_API_TOKEN` | Cloudflare token passed as `CF_API_TOKEN` env |

---

## Sessions (local dev)

```bash
cd infra

# Preview what would happen (no changes made)
bun run preview

# Apply changes (creates/updates resources)
bun run up

# Tear down everything (destructive)
bun run destroy

# Apply a specific resource only (e.g. after fixing a single resource)
bun run up --target urn:pulumi:webapp::cloudflare:index:Worker::podcodar-dev
```

### Stack selection

By default, `pulumi up` operates on the active stack. To target a specific stack:

```bash
pulumi stack select webapp.dev
bun run up
```

To create a new stack:

```bash
pulumi stack init webapp.staging
# then set config
pulumi config set environment staging
pulumi config set accountId YOUR_ID --secret
pulumi config set zoneId YOUR_ZONE --secret
```

---

## Deploy flow

### Local dev loop

```bash
# 1. Make code changes in webapp/

# 2. Build Astro (produces dist/)
bun run w:build

# 3. Preview infra changes
bun run preview

# 4. If happy, apply
bun run up
```

### CI/CD (GitHub Actions)

Merge to `main` → Quality gateway passes → Deploy workflow:

1. **Build** — `bun run w:build` produces `dist/server/` + `dist/client/`
2. **Pulumi login** — via `pulumi/actions@v5` (OIDC or `PULUMI_ACCESS_TOKEN`)
3. **Pulumi up** — runs on `webapp.production` stack, uploads modules + deploys

The deploy is **idempotent** — `pulumi up` only creates/changes what has changed since last run.

---

## How the Worker is built & deployed

```
astro build
  └── dist/
        ├── client/    → WorkerVersion assets (html, css, js)
        └── server/     → WorkerVersion modules (entry.mjs + chunks/*.mjs)

wrangler build
  └── picks up @astrojs/cloudflare entrypoint
  └── modules auto-discovered from dist/server/chunks/
```

`discoverWorkerModules()` in `index.ts` scans `dist/server/` at **plan time** (not deploy time) — so Pulumi knows which files changed and triggers a new version accordingly.

---

## CI auth (OIDC vs PAT)

**PAT (what we use):** Simple but long-lived. The `PULUMI_ACCESS_TOKEN` secret must be kept safe.

**OIDC (recommended for prod):** No long-lived secrets. Configure via:

```yaml
# In .github/workflows/deploy.yml
- uses: pulumi/actions@v5
  with:
    cloud-url: puffinsystems # tells Pulumi to use cloud state backend
    # No token needed if GCP/Azure/GitHub OIDC is configured
```

See [Pulumi OIDC docs](https://www.pulumi.com/docs/using-pulumi/continuous-delivery/github-actions/) to upgrade.

---

## Tear down & recover

If you accidentally delete the Worker in the Cloudflare dashboard:

```bash
bun run up   # Pulumi recreates everything from state
```

If you lose Pulumi state (worst case):

> **WARNING:** Without state, Pulumi cannot manage existing resources. You must either:
>
> - Import existing resources manually: `pulumi import cloudflare:index/worker:Worker my-worker accountId/name`
> - Or delete via Cloudflare dashboard and let Pulumi recreate

Always run `pulumi login` with a **cloud backend** (not local file) to prevent state loss.

---

## File structure

```
infra/
├── index.ts                 ← All Cloudflare resources
├── Pulumi.yaml              ← Stack metadata (name, runtime)
├── Pulumi.dev.yaml          ← Dev config + encrypted secrets
├── Pulumi.production.yaml   ← Production config + encrypted secrets
└── package.json             ← bun run up/preview/destroy
```
