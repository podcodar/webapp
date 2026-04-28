---
name: prd-to-tasks
description: >
  Convert a Product Requirements Document (PRD) into a structured tasks.json file
  with tasks, dependencies, priorities, and estimated effort.
  Use when a PRD exists and the user wants to break it down into implementable tasks,
  or says "turn this into tasks," "create issues from the PRD," or "what are the next steps?"
  Do NOT use when there is no PRD or when the user wants to skip planning and start coding immediately.
---

# PRD to Tasks

Convert a PRD into a machine-readable `tasks.json` file that drives implementation. Each user story and functional requirement becomes one or more concrete, dependency-ordered tasks.

## When to Use

- A PRD has been created and the user wants to start implementation
- The user says: "create tasks," "break this down," "what should I work on first?"
- Before delegating implementation to agents (`implement-tasks`)
- To estimate effort or plan sprints

## When NOT to Use

- No PRD exists (run `create-prd` first)
- The task is trivially small (just do it)
- The user wants a TODO.md instead (use `project-files`)
- For tracking in-progress tasks (use TODO.md from `project-files`)

## Prerequisites

- A PRD exists (created by `create-prd` or manually)
- Access to the PRD file in the current workspace

## tasks.json Format

```jsonc
{
  "$schema": "tasks/v1",
  "metadata": {
    "project": "Feature or project name",
    "prd": "PRD-feature-name.md",
    "created": "YYYY-MM-DD",
    "version": "1.0",
    "totalTasks": 12,
    "totalEstimatedHours": 40,
  },
  "phases": {
    "1-foundation": {
      "label": "Phase 1: Foundation",
      "description": "Core infrastructure and setup that everything depends on",
      "tasks": ["T001", "T002", "T003"],
    },
    "2-core": {
      "label": "Phase 2: Core Features",
      "description": "Must-have user stories (P0)",
      "tasks": ["T004", "T005", "T006", "T007"],
    },
    "3-polish": {
      "label": "Phase 3: Polish & Edge Cases",
      "description": "Should-have user stories (P1) and hardening",
      "tasks": ["T008", "T009", "T010"],
    },
    "4-nice-to-have": {
      "label": "Phase 4: Nice to Have",
      "description": "P2 stories, stretch goals",
      "tasks": ["T011", "T012"],
    },
  },
  "tasks": [
    {
      "id": "T001",
      "title": "Set up project structure and configuration",
      "description": "Create the module directory, configuration files, type definitions, and base interfaces needed by all subsequent tasks.",
      "phase": "1-foundation",
      "priority": "critical",
      "estimatedHours": 2,
      "dependencies": [],
      "userStory": null,
      "functionalReq": "FR-1",
      "tags": ["setup", "types"],
      "acceptanceCriteria": [
        "Directory structure matches project conventions",
        "Type definitions compile without errors",
        "Configuration is loaded correctly",
      ],
    },
    {
      "id": "T002",
      "title": "Implement JWT token generation and validation",
      "description": "Create the core auth utilities: generate access tokens, verify tokens, extract user info from tokens, handle expiration.",
      "phase": "1-foundation",
      "priority": "critical",
      "estimatedHours": 4,
      "dependencies": ["T001"],
      "userStory": "As a user, I want to authenticate so that I can access protected resources.",
      "functionalReq": "FR-1",
      "tags": ["auth", "security"],
      "acceptanceCriteria": [
        "Access tokens are generated with correct claims",
        "Expired tokens are rejected",
        "Tampered tokens are rejected",
        "Token validation completes in under 5ms",
      ],
    },
    {
      "id": "T003",
      "title": "Add auth middleware for protected routes",
      "description": "Create Hono middleware that checks for valid JWT on protected routes and injects user context.",
      "phase": "1-foundation",
      "priority": "critical",
      "estimatedHours": 3,
      "dependencies": ["T002"],
      "userStory": "As a user, I want protected routes to require authentication.",
      "functionalReq": "FR-2",
      "tags": ["auth", "middleware", "api"],
      "acceptanceCriteria": [
        "Protected routes return 401 without valid token",
        "Valid tokens pass through with user context injected",
        "Middleware doesn't affect public routes",
      ],
    },
  ],
}
```

### Field Reference

| Field                | Type         | Required | Description                                                                 |
| -------------------- | ------------ | -------- | --------------------------------------------------------------------------- |
| `id`                 | string       | Yes      | Unique task ID, format `T001`, `T002`, etc.                                 |
| `title`              | string       | Yes      | Short, actionable task title                                                |
| `description`        | string       | Yes      | What needs to be done, context, approach hints                              |
| `phase`              | string       | Yes      | Must match a key in `phases`                                                |
| `priority`           | string       | Yes      | `critical`, `high`, `medium`, `low`                                         |
| `estimatedHours`     | number       | Yes      | Rough estimate in hours                                                     |
| `dependencies`       | string[]     | Yes      | IDs of tasks that must complete first (empty array if none)                 |
| `agent`              | string       | Yes      | Squad agent responsible for implementation (see Agent Mapping)              |
| `moeExperts`         | string[]     | Yes      | MoE experts who review/analyze before implementation (see Expert Selection) |
| `userStory`          | string\|null | No       | The user story this task satisfies                                          |
| `functionalReq`      | string       | No       | The FR this task maps to (e.g., "FR-1")                                     |
| `tags`               | string[]     | No       | Labels for filtering (auth, ui, api, db, test, docs, etc.)                  |
| `acceptanceCriteria` | string[]     | Yes      | Verifiable conditions that prove the task is done                           |

#### Top-Level `agents` Key

The `agents` object maps each squad agent to their assigned tasks for quick
reference during implementation:

```jsonc
"agents": {
  "frontend-engineer": {
    "role": "UI components, client-side functionality",
    "tasks": ["T003", "T004", "T006"]
  },
  "backend-engineer": {
    "role": "Business logic, APIs, data processing",
    "tasks": ["T001", "T002", "T005"]
  },
  "qa-engineer": {
    "role": "Automated tests, linting, integration checks",
    "tasks": ["T007", "T008"]
  }
}
```

### Dependency Rules

1. **Dependencies must reference valid task IDs** — No forward references to non-existent tasks
2. **No circular dependencies** — The graph must be a DAG
3. **Phase dependencies are implicit** — All tasks in phase N may depend on tasks in phase < N
4. **Keep dependencies minimal** — Only list direct dependencies, not transitive ones

## Workflow

### 1. Read the PRD

Parse the PRD and extract all important elements:

- **User stories** — Map each to one or more tasks
- **Functional requirements** — Each FR becomes at least one task
- **Non-functional requirements** — May generate cross-cutting tasks (performance, accessibility, security)
- **Constraints** — May create setup/configuration tasks
- **Dependencies** — External dependencies become initial tasks

### 2. Group into Phases

Default phase structure (adjust based on PRD content):

| Phase            | Contents                                                          | Priority Mapping |
| ---------------- | ----------------------------------------------------------------- | ---------------- |
| `1-foundation`   | Project setup, types, config, database schema, shared utilities   | critical         |
| `2-core`         | All P0 (Must Have) user stories and their FRs                     | critical / high  |
| `3-polish`       | P1 (Should Have) stories, error handling, edge cases, tests, docs | high / medium    |
| `4-nice-to-have` | P2 (Nice to Have) stories, stretch goals                          | medium / low     |

Common additional phases: `0-prerequisites` (for external dependencies), `5-deploy` (CI/CD, monitoring).

### 3. Create Tasks

For each phase, create tasks following these rules:

- **One task = one cohesive unit of work** — Completabe in 2-8 hours
- **Task title is a verb phrase** — "Implement X", "Add Y", "Create Z", "Fix W"
- **Description adds context** — Why this task exists, what approach to take, files to touch
- **Acceptance criteria are testable** — Write them as if for an automated test

### 4. Wire Dependencies

Draw the dependency graph:

```
T001 (setup) ← no deps
  ├── T002 (auth utils) ← depends on T001
  │   ├── T003 (middleware) ← depends on T002
  │   └── T004 (login endpoint) ← depends on T002
  └── T005 (user model) ← depends on T001
      └── T006 (user API) ← depends on T005
```

Encode in the `dependencies` arrays.

### 5. Add Estimates and Tags

- **estimatedHours:** Be conservative. If unsure, round up.
- **tags:** Use consistent tags across the project. Common: `setup`, `types`, `auth`, `api`, `ui`, `db`, `test`, `docs`, `security`, `performance`, `a11y`, `dx`.

### 6. Assign Agent and MoE Experts

Every task must be assigned to a squad agent (who implements) and a set of MoE
experts (who review/analyze before implementation). These go in the `agent` and
`moeExperts` fields on each task, and are summarized in the top-level `agents` key.

#### Agent Mapping

Map each task to the squad agent whose domain matches:

| Squad Agent         | Domains                                                             | Task Tags                                                            |
| ------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `frontend-engineer` | UI components, client-side JS, Astro pages, i18n, CSS, Alpine, htmx | `ui`, `astro`, `alpine`, `htmx`, `i18n`, `form`, `css`, `responsive` |
| `backend-engineer`  | Libraries, APIs, Astro endpoints, business logic, data processing   | `lib`, `api`, `endpoint`, `pix`, `qr`, `server`, `svg`               |
| `devops-sre`        | Dependency management, build tooling, CI/CD, configuration          | `setup`, `deps`, `config`, `ci`, `deploy`                            |
| `qa-engineer`       | Unit tests, integration tests, E2E tests, linting                   | `test`, `unit`, `integration`, `e2e`                                 |

If a task spans domains (e.g., an endpoint with UI), pick the primary agent. If
unsure, default to `backend-engineer` for server-side work and `frontend-engineer`
for client-side work.

#### MoE Expert Selection

Choose 2–4 MoE experts based on the task's concerns. Use the `mixture-of-experts`
skill definitions:

| Task Domain (tags)                           | Recommended MoE Experts                                    | Why                                 |
| -------------------------------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `setup`, `deps`, `config`                    | `maintainer`, `dx-specialist`                              | Tooling and dev experience          |
| `lib`, `pix`, `qr`                           | `architect`, `security`, `maintainer`                      | Core logic correctness              |
| `lib`, `svg`, `qr`                           | `architect`, `performance`, `maintainer`                   | Rendering performance               |
| `api`, `endpoint`, `svg`, `caching`          | `architect`, `api-designer`, `security`, `performance`     | API design + caching + security     |
| `api`, `endpoint`, `html`, `htmx`, `caching` | `architect`, `api-designer`, `maintainer`, `performance`   | API design + templates + caching    |
| `i18n`, `pt-br`                              | `maintainer`, `dx-specialist`                              | Consistency and completeness        |
| `ui`, `alpine`, `form`, `validation`         | `maintainer`, `minimalist`, `dx-specialist`, `performance` | Interactive form quality            |
| `ui`, `htmx`, `clipboard`, `qr`              | `maintainer`, `minimalist`, `dx-specialist`, `performance` | Async UI quality                    |
| `ui`, `astro`, `integration`                 | `maintainer`, `minimalist`                                 | Page structure simplicity           |
| `ui`, `edge-case`                            | `maintainer`, `minimalist`, `dx-specialist`                | Edge case UX clarity                |
| `ui`, `a11y`, `graceful-degradation`         | `maintainer`, `dx-specialist`                              | Accessibility and fallbacks         |
| `ui`, `responsive`, `dark-mode`, `a11y`      | `maintainer`, `minimalist`, `dx-specialist`                | Visual quality across modes         |
| `alpine`, `htmx`, `integration`              | `maintainer`, `dx-specialist`, `architect`                 | Framework interop complexity        |
| `test`, `unit`                               | `maintainer`, `security`                                   | Test coverage + security edge cases |
| `test`, `integration`, `api`                 | `maintainer`, `security`, `api-designer`                   | API correctness + security          |
| `test`, `e2e`                                | `maintainer`, `dx-specialist`                              | User-facing test quality            |

**Override rule:** If the task description or acceptance criteria suggest special
concerns (e.g., unusual security risk, strict performance target), adjust the
expert mix accordingly. Add `security` for auth/PII concerns, `performance` for
latency-sensitive work, `minimalist` if the task risks over-engineering.

#### Build the `agents` Top-Level Key

After assigning every task's `agent`, build the `agents` summary:

```jsonc
"agents": {
  "frontend-engineer": {
    "role": "UI components, client-side functionality (Alpine, htmx, Astro pages, i18n, CSS)",
    "tasks": ["T006", "T007", "T008", "T009"]
  },
  "backend-engineer": {
    "role": "Libraries (pix, qrcode), Astro server endpoints",
    "tasks": ["T002", "T003", "T004", "T005"]
  },
  "devops-sre": {
    "role": "Dependency management",
    "tasks": ["T001"]
  },
  "qa-engineer": {
    "role": "Unit tests, integration tests, E2E tests",
    "tasks": ["T014", "T015", "T016", "T017"]
  }
}
```

The `agents` key must be validated: every task ID listed in `agents.*.tasks` must
appear in the `tasks` array, and every task in `tasks` must have its `agent` field
match exactly one agent entry.

### 7. Validate the File

Run these checks:

```bash
# Parse JSON is valid
cat tasks.json | python3 -c "import json,sys; json.load(sys.stdin); print('Valid JSON')"

# No missing dependency targets
cat tasks.json | python3 -c "
import json, sys
data = json.load(sys.stdin)
tasks = {t['id'] for t in data['tasks']}
for t in data['tasks']:
    for dep in t['dependencies']:
        if dep not in tasks:
            print(f'ERROR: {t[\"id\"]} depends on missing task {dep}')
print('Dependencies OK')
"

# No circular dependencies (topological sort must succeed)
# Check phase keys match
# Check IDs are unique

# Every task has agent and moeExperts assigned
cat tasks.json | python3 -c "
import json
data = json.load(open('tasks.json'))
for t in data['tasks']:
    if 'agent' not in t:
        print(f'ERROR: {t[\"id\"]} missing agent field')
    if 'moeExperts' not in t:
        print(f'ERROR: {t[\"id\"]} missing moeExperts field')
print('Agent/MoE fields OK')
"

# agents key matches task assignments
cat tasks.json | python3 -c "
import json
data = json.load(open('tasks.json'))
for agent_name, agent_data in data.get('agents', {}).items():
    listed = set(agent_data['tasks'])
    actual = {t['id'] for t in data['tasks'] if t.get('agent') == agent_name}
    if listed != actual:
        print(f'WARN: {agent_name} task list mismatch')
print('Agent summary OK')
"
```

### 8. Present for Review

Summarize the task breakdown including agent assignments:

```
I've created tasks.json with [N] tasks across [M] phases:

Phase 1 - Foundation (3 tasks, 8h): Setup, types, base config
Phase 2 - Core (5 tasks, 22h): All P0 user stories
Phase 3 - Polish (3 tasks, 8h): Error handling, tests, docs
Phase 4 - Nice to Have (2 tasks, 6h): P2 stories

Total estimated: 44h
Critical path: T001 → T002 → T004 → T007 → T009

Agent assignments:
- frontend-engineer: 4 tasks (12h) — form, result pane, page integration
- backend-engineer: 3 tasks (10h) — libraries, endpoints
- devops-sre: 1 task (0.5h) — dependencies
- qa-engineer: 4 tasks (9h) — unit, integration, E2E tests

File: tasks.json — ready for implement-tasks

Want me to adjust any priorities, estimates, or agent assignments?
```

## Complete Example

Given the Dark Mode PRD from `create-prd`:

```jsonc
{
  "$schema": "tasks/v1",
  "metadata": {
    "project": "Dark Mode",
    "prd": "PRD-dark-mode.md",
    "created": "2026-04-27",
    "version": "1.0",
    "totalTasks": 5,
    "totalEstimatedHours": 12,
    "totalTasks": 5,
  },
  "agents": {
    "frontend-engineer": {
      "role": "UI components, CSS, state management",
      "tasks": ["T001", "T002", "T003", "T004", "T005"],
    },
  },
  "phases": {
    "1-foundation": {
      "label": "Phase 1: Foundation",
      "description": "Theme infrastructure",
      "tasks": ["T001", "T002"],
    },
    "2-core": {
      "label": "Phase 2: Core Feature",
      "description": "Theme toggle and system preference",
      "tasks": ["T003", "T004"],
    },
    "3-polish": {
      "label": "Phase 3: Polish",
      "description": "Persistence and transitions",
      "tasks": ["T005"],
    },
  },
  "tasks": [
    {
      "id": "T001",
      "title": "Define CSS custom properties for light and dark themes",
      "description": "Create CSS variables for all colors in both themes. Audit existing color usage and replace hardcoded colors with variables.",
      "phase": "1-foundation",
      "priority": "critical",
      "estimatedHours": 3,
      "dependencies": [],
      "agent": "frontend-engineer",
      "moeExperts": ["maintainer", "minimalist"],
      "userStory": null,
      "functionalReq": "FR-1",
      "tags": ["ui", "css"],
      "acceptanceCriteria": [
        "All colors in the app are controlled by CSS custom properties",
        "Light theme looks identical to current app",
        "Dark theme colors meet WCAG AA contrast minimums",
        "No hardcoded colors remain outside of theme definitions",
      ],
    },
    {
      "id": "T002",
      "title": "Create ThemeProvider context and useTheme hook",
      "description": "SolidJS context provider that holds current theme state and provides toggle functionality. Expose via useTheme() hook.",
      "phase": "1-foundation",
      "priority": "critical",
      "estimatedHours": 2,
      "dependencies": ["T001"],
      "agent": "frontend-engineer",
      "moeExperts": ["maintainer", "dx-specialist", "architect"],
      "userStory": null,
      "functionalReq": "FR-1",
      "tags": ["ui", "state"],
      "acceptanceCriteria": [
        "ThemeProvider wraps the app root",
        "useTheme() returns { theme, toggle, setTheme }",
        "Theme changes trigger re-render of dependent components",
        "Default theme is 'light'",
      ],
    },
    {
      "id": "T003",
      "title": "Add theme toggle to settings menu",
      "description": "Add a toggle switch or button in the existing settings/user menu. Use useTheme() to read/write state.",
      "phase": "2-core",
      "priority": "high",
      "estimatedHours": 2,
      "dependencies": ["T002"],
      "agent": "frontend-engineer",
      "moeExperts": ["maintainer", "minimalist", "dx-specialist"],
      "userStory": "As a user, I want to toggle between light and dark mode so that I can reduce eye strain in low-light environments.",
      "functionalReq": "FR-1",
      "tags": ["ui"],
      "acceptanceCriteria": [
        "Toggle is visible in settings menu",
        "Clicking toggle switches theme immediately",
        "Toggle reflects current theme state",
        "Toggle is keyboard accessible",
      ],
    },
    {
      "id": "T004",
      "title": "Detect and respect OS color scheme preference",
      "description": "On first visit, check window.matchMedia('(prefers-color-scheme: dark)'). If user hasn't explicitly set a preference, use the OS value.",
      "phase": "2-core",
      "priority": "high",
      "estimatedHours": 1.5,
      "dependencies": ["T002"],
      "agent": "frontend-engineer",
      "moeExperts": ["maintainer", "dx-specialist"],
      "userStory": "As a user, I want the app to follow my OS color scheme by default so that I don't need to configure it manually.",
      "functionalReq": "FR-2",
      "tags": ["ui", "a11y"],
      "acceptanceCriteria": [
        "First visit on dark-mode OS shows dark theme",
        "First visit on light-mode OS shows light theme",
        "OS theme change while app is open updates app theme",
        "User's explicit choice overrides OS preference",
      ],
    },
    {
      "id": "T005",
      "title": "Persist theme preference to localStorage",
      "description": "Save user's theme choice to localStorage. On load, check localStorage first, then fall back to OS preference, then light.",
      "phase": "3-polish",
      "priority": "medium",
      "estimatedHours": 1.5,
      "dependencies": ["T002", "T004"],
      "agent": "frontend-engineer",
      "moeExperts": ["maintainer", "minimalist"],
      "userStory": "As a user, I want my preference to persist across sessions so that I don't need to re-set it.",
      "functionalReq": "FR-1",
      "tags": ["ui", "state"],
      "acceptanceCriteria": [
        "Theme choice survives page reload",
        "Theme choice survives browser restart",
        "Clearing localStorage resets to OS default",
        "No flash of wrong theme on page load (SSR-safe)",
      ],
    },
  ],
}
```

## Edge Cases

### Large PRDs (20+ User Stories)

Break into multiple task files or use phases aggressively:

```jsonc
"phases": {
  "1-mvp": { "label": "Phase 1: MVP", "tasks": ["T001".."T008"] },
  "2-enhance": { "label": "Phase 2: Enhancement", "tasks": ["T009".."T015"] },
  "3-scale": { "label": "Phase 3: Scale", "tasks": ["T016".."T020"] }
}
```

### Tasks That Span Multiple FRs

A task may satisfy multiple functional requirements. List the primary one in `functionalReq`. Add secondary ones in the description or tags.

### Unclear Dependencies

If the dependency order is unclear, annotate:

```jsonc
"description": "NOTE: May need to run before T007 if the API changes. Confirm during implementation."
```

### External Dependencies

For dependencies on external systems or other teams:

```jsonc
{
  "id": "T000",
  "title": "[EXTERNAL] Obtain API key from third-party service",
  "description": "Blocked until we receive API credentials from vendor X.",
  "phase": "0-prerequisites",
  "priority": "critical",
  "estimatedHours": 0,
  "dependencies": [],
  "acceptanceCriteria": ["API key received and validated"],
  "tags": ["external", "blocker"],
}
```

## Best Practices

- **Tasks are leaf-level work** — If a task is "Implement auth system," it's too big. Split it.
- **Acceptance criteria are binary** — Either passing or failing, no judgment calls.
- **Keep estimates honest** — Don't pad, don't optimistically undercount.
- **Dependencies are minimal** — Only list what must precede. Don't chain everything.
- **Assign agent and MoE experts** — Every task must have an `agent` and `moeExperts`. Validate with the checks in Step 7. Don't skip this — it's required for `implement-tasks` to delegate correctly.
- **Tags enable filtering** — Use consistent tags so agent assignment and MoE selection are predictable.
- **One tasks.json per project** — Not per feature within a project (use phases for that).
- **Version the file** — If the PRD changes, update tasks.json and bump the version.

## Output

Write the tasks.json to the project root or alongside the PRD:

```bash
# Option A: Next to PRD
PRD-dark-mode.md
tasks.json

# Option B: In a docs/ or specs/ directory
docs/PRD-dark-mode.md
docs/tasks.json
```

The `implement-tasks` skill will look for `tasks.json` in the current working directory by default.
