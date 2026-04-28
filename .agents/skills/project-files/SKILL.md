---
name: project-files
description: Manage structured communication files (PLAN.md, TODO.md, SPEC.md, etc.) to coordinate work across agents and sessions. Use when starting complex tasks, delegating to subagents, or maintaining project state.
---

# Project Communication Files

Standard files for coordinating work across agents and sessions. These files serve as the single source of truth for project state.

## File Overview

| File           | Purpose                           | Updated By        | Read By               |
| -------------- | --------------------------------- | ----------------- | --------------------- |
| `PLAN.md`      | High-level strategy and approach  | Lead agent        | All agents            |
| `TODO.md`      | Current tasks and queue           | Working agents    | All agents            |
| `SPEC.md`      | Technical requirements and design | Architect/planner | Implementation agents |
| `DECISIONS.md` | Architecture decisions (ADRs)     | Any agent         | All future agents     |
| `SESSION.md`   | Session context and handoff       | Current session   | Next session          |
| `STATUS.md`    | Current project state             | Any agent         | Status checks         |
| `CHANGELOG.md` | Completed work log                | Working agents    | Review agents         |

## File Formats

### PLAN.md

Strategic direction. Updated when approach changes.

```markdown
# Plan: <Feature/Project Name>

## Goal

One-line objective.

## Strategy

High-level approach (2-3 paragraphs).

## Phases

### Phase 1: <Name> [IN_PROGRESS]

- Objective: What this phase achieves
- Success criteria: How we know it's done

### Phase 2: <Name> [PENDING]

- Objective: ...

## Constraints

- Must use X technology
- Must maintain Y compatibility

## Risks

- Risk: Mitigation strategy
```

**State markers:** `[PENDING]`, `[IN_PROGRESS]`, `[COMPLETED]`, `[BLOCKED]`

### TODO.md

Active work queue. Updated continuously.

```markdown
# TODO

## Current Sprint

### In Progress

- [ ] <agent-name>: Task description (blocked by: X, ETA: Y)

### Ready

- [ ] <agent-name>: Task description (depends on: X)
- [ ] <agent-name>: Task description

### Blocked

- [ ] <agent-name>: Task description (blocked by: X, reason: Y)

## Backlog

- [ ] Future task

## Completed (Last 5)

- [x] <agent-name>: Task description (completed: DATE)
```

**Assignment format:** `<agent-name>: <task>` (e.g., `architect: Design auth API`)

### SPEC.md

Technical specification. Updated during planning.

````markdown
# SPEC: <Component/Feature>

## Overview

What this component does.

## Interface

### API/Exports

```typescript
function doThing(input: Input): Output;
```
````

### Types

```typescript
interface Input { ... }
interface Output { ... }
```

## Behavior

- Given X, should Y
- Error cases: Z

## Dependencies

- Requires: module-a
- Used by: module-b

## Open Questions

- [ ] Question to resolve

````

### DECISIONS.md

Architecture Decision Records. Append-only.

```markdown
# Decisions

## ADR-001: <Title>

**Date:** YYYY-MM-DD
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-XXX

### Context
What problem were we solving?

### Decision
What did we decide?

### Consequences
Positive:
- Benefit 1

Negative:
- Trade-off 1
````

**ADR numbering:** Sequential (ADR-001, ADR-002...)

### SESSION.md

Session handoff. Updated at end of session.

```markdown
# Session: YYYY-MM-DD HH:MM

## Context

What we were working on and why.

## Current State

- PLAN phase: X
- TODO items in progress: Y, Z
- Blockers: None | X

## Files Modified

- `src/auth/login.ts` - Added validation
- `tests/auth.test.ts` - Added tests

## Next Actions

1. Complete X (assigned to: agent-name)
2. Start Y (ready to go)

## Notes for Next Session

- Watch out for: potential issue
- Remember to: check Z
```

### STATUS.md

Quick status dashboard. Updated as needed.

```markdown
# Status

**Last Updated:** YYYY-MM-DD HH:MM  
**Current Phase:** Implementation  
**Overall Health:** 🟢 On Track | 🟡 At Risk | 🔴 Blocked

## Progress

- [x] Planning complete
- [x] Design approved
- [ ] Implementation (60%)
- [ ] Testing
- [ ] Deployment

## Blockers

None.

## Recent Changes

- Change 1
- Change 2
```

### CHANGELOG.md

Completed work history. Append-only.

```markdown
# Changelog

## [Unreleased]

### Added

- Feature X implemented by @agent-name
- API endpoint Y added

### Fixed

- Bug Z resolved

## [DATE] - Release Name

### Added

- Initial implementation
```

Follows [Keep a Changelog](https://keepachangelog.com/) format.

## Workflow Integration

### Starting a Complex Task

```bash
# 1. Create PLAN.md with high-level strategy
cat > PLAN.md << 'EOF'
# Plan: User Authentication

## Goal
Implement secure JWT-based authentication.

## Strategy
...
EOF

# 2. Create TODO.md with initial tasks
cat > TODO.md << 'EOF'
# TODO

## Current Sprint

### Ready
- [ ] architect: Design auth API (SPEC.md)
- [ ] security: Review threat model
EOF

# 3. Create initial SPEC.md template
cat > SPEC.md << 'EOF'
# SPEC: Authentication API

## Overview
...
EOF
```

### Delegating to Subagents

When using `subagent-tmux` or `mixture-of-experts`:

```bash
# Read context files before spawning
PLAN=$(cat PLAN.md)
TODO=$(cat TODO.md)
SPEC=$(cat SPEC.md)

# Spawn expert with full context
tmux send-keys -t subagent-architect \
  "pi -p 'Review PLAN.md, TODO.md, and SPEC.md. Then: $TASK' ..." C-m
```

### Session Handoff

At end of session:

```bash
# 1. Update TODO.md - mark completed, move in-progress to ready
# 2. Update SESSION.md with current state
# 3. Update CHANGELOG.md with completed work
cat >> CHANGELOG.md << 'EOF'

### Added
- Implemented user login flow (SESSION.md for details)
EOF
```

### Mixture of Experts Coordination

Use files to share context between experts:

```bash
# Pre-populate files for experts to read
for expert in architect security performance; do
  # Each expert reads PLAN/TODO/SPEC, writes to DECISIONS
  tmux send-keys -t "moe-$expert" \
    "cat PLAN.md SPEC.md | pi -p 'Review and add decisions to DECISIONS.md' ..." C-m
done
```

## Best Practices

### DOs

- **Update TODO.md in real-time** — Mark tasks done as you complete them
- **Write SESSION.md before quitting** — Future you will thank you
- **Keep SPEC.md precise** — Ambiguity causes rework
- **Date all entries** — Context decays over time
- **Use status markers** — `[IN_PROGRESS]`, `[BLOCKED]`, `[DONE]`

### DON'Ts

- **Don't duplicate information** — Link to files instead of copying
- **Don't leave TODO.md stale** — If it's wrong, it's harmful
- **Don't delete from CHANGELOG** — Append-only history
- **Don't skip DECISIONS.md** — You'll forget why you chose X

## File Lifecycle

```
PLAN.md      → Created at project start, updated when strategy shifts
TODO.md      → Created with first tasks, updated continuously
SPEC.md      → Created during design phase, refined during implementation
DECISIONS.md → Created on first ADR, appended forever
SESSION.md   → Created at session end, archived after next session starts
STATUS.md    → Created when needed, kept current
CHANGELOG.md → Created at project start, appended forever
```

## Quick Commands

```bash
# Check current status
cat STATUS.md

# See what's in progress
grep -A 5 "In Progress" TODO.md

# View recent decisions
tail -50 DECISIONS.md

# Find previous session context
cat SESSION.md

# See what changed recently
tail -30 CHANGELOG.md
```
