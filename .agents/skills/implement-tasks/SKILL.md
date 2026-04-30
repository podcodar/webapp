---
name: implement-tasks
description: >
  Read a tasks.json file, resolve the dependency graph, and delegate each task
  to specialized expert agents using the Mixture of Experts (MoE) orchestration pattern.
  Use when a tasks.json exists and the user wants to start implementing, or says
  "implement the tasks," "build it," or "execute the plan."
  Do NOT use when no tasks.json exists (run prd-to-tasks first), for a single
  straightforward task (just do it directly), or when the user wants manual control
  over each step.
metadata:
  scripts:
    - ../../scripts/validate-dag.py
  runtime: python3
---

# Implement Tasks

Orchestrate the implementation of a structured task plan (`tasks.json`) by resolving dependencies, selecting the right expert mix for each task, and delegating work using the Mixture of Experts pattern.

## When to Use

- A `tasks.json` file exists (created by `prd-to-tasks` or manually)
- The user says: "implement the tasks," "build it," "execute the plan," "start coding"
- Multiple interdependent tasks need coordinated execution

## When NOT to Use

- No `tasks.json` exists — run `prd-to-tasks` first (or `create-prd` → `prd-to-tasks`)
- Single, straightforward task — just do it directly
- User wants to manually review/pick each task — use `project-files` TODO-driven workflow
- Exploration or research phase — use `explore` skill first

## Prerequisites

- A valid `tasks.json` file in the current working directory
- The `mixture-of-experts` skill is available
- For tmux-based parallelism: `terminal-multiplexer` skill is available

## Overview

```
tasks.json
    │
    ▼
┌─────────────────┐
│ 1. Parse &      │
│    Validate      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 2. Topological  │
│    Sort          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 3. For each     │
│    ready task:   │
│  - Select experts│
│  - Spawn MoE    │
│  - Collect output│
│  - Mark complete │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. Synthesize   │
│    final report  │
└─────────────────┘
```

## Workflow

### Step 1: Read and Parse tasks.json

Read the file and extract the task graph:

```bash
# Read the file
cat tasks.json
```

Parse mentally or with a script:

- **Tasks** — The full task list with IDs, descriptions, dependencies
- **Phases** — The phase grouping and order
- **Metadata** — Project name, total estimates
- **Dependency graph** — Build the DAG (who depends on whom)

### Step 2: Validate the Task Graph

Before implementing, check for common issues:

1. **All dependency IDs exist** — No dangling references
2. **No circular dependencies** — The graph must be a DAG (can run a topological sort)
3. **All tasks have acceptance criteria** — Cannot verify completion without them
4. **All tasks have agent and moeExperts** — Required for delegation (added by `prd-to-tasks` step 6)
5. **Phase ordering is logical** — Foundation before features, core before polish

Run validation with the shared DAG validator:

```bash
../../scripts/validate-dag.py tasks.json --summary
```

This checks: valid JSON, missing dependencies, circular dependencies (Kahn's algorithm), phase keys, unique IDs, agent/moeExperts fields, and agent summary consistency. With `--summary` it also prints the topological order and hour estimates.

**If validation fails**, the script exits with code 1 and prints a specific error. Stop and report the issues. Do NOT proceed until fixed.

### Step 3: Determine Execution Order

Use topological sort (Kahn's algorithm) to produce a valid execution order:

```
T001 → T002 → T003 → T004 → T005 → T006 → T007 → ...
```

Tasks with no dependencies can run in parallel. Tasks that depend on others must wait.

### Step 4: For Each Task, Read Agent and MoE Experts

Since `prd-to-tasks` v1.1+, every task already has explicit `agent` and
`moeExperts` fields assigned. Read them directly from tasks.json — no inference
needed:

```python
# Read pre-assigned agent and experts
task = tasks['T004']
agent = task['agent']           # e.g., "backend-engineer"
moe_experts = task['moeExperts']  # e.g., ["architect", "api-designer", "security"]
```

The `agent` field determines who writes the code (the squad agent). The
`moeExperts` field determines who reviews before implementation.

#### Fallback: Tasks Without Explicit Assignments

If a task is missing `agent` or `moeExperts` (pre-v1.1 tasks.json or manually
created), use the `mixture-of-experts` skill to select the appropriate experts
based on the task's tags and domain. See `mixture-of-experts` → "Common Patterns"
for the canonical tag-to-expert mapping table.

Prefer updating the tasks.json with explicit assignments — it's more reliable
and reviewable than runtime inference.

### Step 5: Delegate via MoE

For each ready task, spawn a Mixture of Experts session. There are two modes:

#### Mode A: Sequential (Simpler, for most cases)

Execute tasks one at a time, using MoE for each:

```
1. Send task description to MoE experts
2. Wait for all expert analyses
3. Aggregate into implementation plan
4. Implement based on the plan
5. Verify against acceptance criteria
6. Mark task complete
7. Move to next ready task
```

#### Mode B: Parallel (For independent tasks in the same phase)

When multiple tasks have no mutual dependencies, run them concurrently:

```bash
# Tasks T004 and T005 are independent (both depend on T003 but not each other)
# Read their moeExperts from tasks.json and spawn in parallel

# T004: moeExperts read from tasks.json, e.g., ["architect", "api-designer", "security"]
EXPERTS_T004=$(python3 -c "
import json
t = [t for t in json.load(open('tasks.json'))['tasks'] if t['id']=='T004'][0]
print(','.join(t['moeExperts']))
")

tmux new-session -d -s task-T004
tmux send-keys -t task-T004 \
  "pi -p 'Implement task T004: [description]. Acceptance criteria: [criteria].
   Use MoE experts: \$EXPERTS_T004.'" C-m

# T005: same pattern
tmux new-session -d -s task-T005
tmux send-keys -t task-T005 \
  "pi -p 'Implement task T005: [description]. Acceptance criteria: [criteria].
   Use MoE experts: \$EXPERTS_T005.'" C-m
```

### Step 6: Verify Completion

After each task, verify against acceptance criteria:

```
✅ T001: Set up project structure
  - ✓ Directory structure matches conventions
  - ✓ Type definitions compile
  - ✓ Configuration loads correctly

✅ T002: JWT token generation
  - ✓ Tokens generated with correct claims
  - ✓ Expired tokens rejected
  - ✓ Tampered tokens rejected
  - ✓ Validation under 5ms
```

If any criterion fails, fix before marking the task complete.

### Step 7: Handle Failures

If a task cannot be completed:

1. **Diagnose the issue** — Is it a code bug, missing info, design flaw?
2. **If fixable:** Fix and re-verify
3. **If blocked by missing info:** Use `grill-me` to ask the user
4. **If the approach is wrong:** Update the task or PRD and re-plan
5. **If dependency was done wrong:** Fix the dependency first, then retry

```bash
# Example: Task fails because dependency T002 has a bug
echo "Task T003 blocked: Middleware test fails because T002's token validation
doesn't handle edge case X. Going back to fix T002 first."

# Re-run T002 with the specific issue
pi -p "Fix T002 (JWT token validation): handle edge case X where [details].
Acceptance criteria: [original + new]"
```

### Step 8: Report Progress

Report progress after each phase completion:

```
Phase 1: Foundation — ✅ Complete (3/3 tasks, 8h estimated, 7.5h actual)

✅ T001 - Project setup (2h)
✅ T002 - JWT utils (4h)
✅ T003 - Auth middleware (1.5h — simpler than expected)

Phase 2: Core — 🔄 In Progress (1/3 tasks)

✅ T004 - Login endpoint (3h)
🔄 T005 - Registration endpoint (in progress...)
⏳ T006 - Password reset (waiting on T005)

Next: T005 → T006 → Phase 3 (Polish)
```

### Step 9: Final Report

When all tasks are complete, produce a synthesis report:

```markdown
# Implementation Complete: [Project Name]

**Completed:** YYYY-MM-DD
**Tasks:** 8/8 complete
**Estimated:** 32h | **Actual:** 30h

## Summary

[2-3 sentences about what was built]

## Phase Breakdown

### Phase 1: Foundation

- T001, T002, T003 completed

### Phase 2: Core

- T004, T005, T006 completed

### Phase 3: Polish

- T007, T008 completed

## Files Changed

- `src/auth/types.ts` — JWT type definitions
- `src/auth/utils.ts` — Token generation and validation
- `src/auth/middleware.ts` — Auth middleware
- `src/routes/auth/login.ts` — Login endpoint
- `src/routes/auth/register.ts` — Registration endpoint
- `src/routes/auth/reset.ts` — Password reset endpoint
- `tests/auth/` — Test suite (12 tests)
- `PRD-auth.md` — Updated with implementation notes

## Acceptance Criteria Status

All 24 criteria across 8 tasks verified.

## Known Issues / Follow-ups

- None

## Next Steps

- Deploy to staging for QA
- Run integration tests against staging
```

## Example: Full Execution

```bash
#!/bin/bash
# Execute all tasks from tasks.json

TASKS_FILE="tasks.json"
PROJECT=$(python3 -c "import json; print(json.load(open('$TASKS_FILE'))['metadata']['project'])")

echo "🚀 Starting implementation: $PROJECT"
echo ""

# Read task count
TOTAL=$(python3 -c "import json; print(json.load(open('$TASKS_FILE'))['metadata']['totalTasks'])")
echo "Total tasks: $TOTAL"

# Get topological order from the shared DAG validator
ORDER=$(../../scripts/validate-dag.py "$TASKS_FILE" --order)

echo "Execution order: $ORDER"
echo ""

# Execute each task
for TID in $ORDER; do
  # Get task details including pre-assigned agent and MoE experts
  TITLE=$(python3 -c "import json; [print(t['title']) for t in json.load(open('$TASKS_FILE'))['tasks'] if t['id']=='$TID']")
  DESC=$(python3 -c "import json; [print(t['description']) for t in json.load(open('$TASKS_FILE'))['tasks'] if t['id']=='$TID']")
  AGENT=$(python3 -c "import json; [print(t['agent']) for t in json.load(open('$TASKS_FILE'))['tasks'] if t['id']=='$TID']")
  EXPERTS=$(python3 -c "import json; [print(','.join(t['moeExperts'])) for t in json.load(open('$TASKS_FILE'))['tasks'] if t['id']=='$TID']")
  CRITERIA=$(python3 -c "import json; [print('\n'.join('- ' + a for a in t['acceptanceCriteria'])) for t in json.load(open('$TASKS_FILE'))['tasks'] if t['id']=='$TID']")

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📋 $TID: $TITLE"
  echo "   Agent: $AGENT"
  echo "   MoE Experts: $EXPERTS"
  echo ""

  # Build MoE prompt
  PROMPT="Implement the following task. Write real code, not plans.

Task: $TITLE
Description: $DESC

Acceptance Criteria:
$CRITERIA

Expert perspectives to consider: $EXPERTS

After implementing, verify each acceptance criterion."

  # Execute (replace with actual pi + MoE orchestration)
  echo "$PROMPT" | pi -p "$(cat)"

  echo ""
  echo "✅ $TID complete"
  echo ""

  # Mark task done in working memory (or update tasks.json status)
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Implementation complete: $PROJECT"
echo "   $TOTAL/$TOTAL tasks done"
```

## Best Practices

### DOs

- **Validate the graph first** — Don't start implementing a broken plan
- **Verify each task against acceptance criteria** — Don't mark done without checking
- **Fix problems at the source** — If T005 fails because T002 is buggy, fix T002
- **Report progress clearly** — Phase + task status so the user knows what's happening
- **Use explicit agent and moeExperts from tasks.json** — Read them directly, don't infer. They were assigned during `prd-to-tasks` step 6 for a reason.
- **Keep the user in the loop** — Especially when a task is blocked or needs clarification

### DON'Ts

- **Don't skip dependencies** — Tasks built on broken foundations are broken
- **Don't run everything in parallel** — Respect the dependency graph
- **Don't ignore acceptance criteria** — They define "done"
- **Don't use MoE for trivial tasks** — "Add a comment" doesn't need 4 experts
- **Don't proceed after validation failure** — Fix the tasks.json first
- **Don't lose track of what's done** — Keep a mental or file-based task board

## Scaling: Large Task Sets (50+ Tasks)

For large projects:

- **Process phase by phase** — Complete all of Phase 1 before starting Phase 2
- **Batch parallel tasks** — Within a phase, run independent tasks concurrently (up to 3-5 at a time)
- **Pause between phases** — Report progress and let the user review before continuing
- **Use tmux sessions** — Long-running tasks in background tmux sessions
- **Track with a status file** — Write `IMPLEMENTATION_STATUS.md` to persist progress:

```markdown
# Implementation Status: User Auth System

Last Updated: 2026-04-27 14:30

## Phase 1: Foundation

- [x] T001: Project setup
- [x] T002: JWT utils
- [x] T003: Auth middleware

## Phase 2: Core

- [x] T004: Login endpoint
- [ ] T005: Registration (in progress)
- [ ] T006: Password reset
```

## Integration with Other Skills

```
create-prd    → Produces PRD
prd-to-tasks  → Produces tasks.json
implement-tasks → Executes tasks.json
    ├── Uses: mixture-of-experts (expert definitions, spawn/aggregate patterns)
    ├── Uses: terminal-multiplexer (for parallel tasks)
    ├── Uses: grill-me (when blocked by ambiguity)
    └── Uses: project-files (for status tracking)
```

## Edge Cases

### Empty Task List

If `tasks.json` has zero tasks:

```
tasks.json has 0 tasks. Nothing to implement.
Was the PRD created? Run create-prd first.
```

### Single Task

For a single task, skip the full orchestration and just implement it with a lighter-weight review:

```
Only 1 task (T001). No dependencies. Implementing directly with architect + maintainer review.
```

Set up a focused MoE call with just 2 experts.

### Blocked by External Dependency

```
Task T003 depends on T000 (EXTERNAL: API credentials).
T000 is marked external/blocker. Cannot proceed past T000.

Options:
1. Wait for credentials (pause implementation)
2. Mock the external service for development (create a mock task)
3. Skip T003 and implement other independent tasks
```

### Failed Validation

If the tasks.json has issues, report them clearly:

```
❌ tasks.json validation failed:

1. T007 depends on T999 (does not exist)
2. Circular dependency: T004 → T006 → T004

Fix these before implementing. Suggested fixes:
- T007: Did you mean T009?
- T004/T006: Remove one dependency direction
```

### User Interrupts Mid-Implementation

Save progress and create a handoff:

```bash
# Write current state
cat > IMPLEMENTATION_STATUS.md << 'EOF'
# Implementation Status: Interrupted

Last Updated: 2026-04-27 15:00
Interrupted during: Phase 2, Task T005 (Registration endpoint)

## Completed
- [x] T001-T004

## In Progress
- [ ] T005 (partially done — auth utils written, endpoint stubbed)

## Not Started
- [ ] T006-T012
EOF

echo "Progress saved to IMPLEMENTATION_STATUS.md"
echo "Resume with: 'continue implementing tasks'"
```
