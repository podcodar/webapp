---
name: create-prd
description: >
  Create a Product Requirements Document (PRD) from recent discussions, conversations,
  or accumulated context. Use when the user wants to formalize requirements, document
  what was discussed, or create a spec to guide implementation.
  Do NOT use for technical implementation specs (use SPEC.md from project-files) or
  for already-implemented features (use CHANGELOG.md).
---

# Create PRD

Create a formal Product Requirements Document that captures what was discussed and what needs to be built. A PRD bridges conversation and implementation — it's the single source of truth for what the product or feature should do.

## When to Use

- After a long discussion about a feature (user says "write this up" or "create a PRD")
- Before starting a major implementation effort
- When the user wants to align stakeholders or get sign-off
- As input to `prd-to-tasks` for task breakdown
- To capture decisions made during `grill-me` sessions

## When NOT to Use

- For technical design specs (use SPEC.md from `project-files`)
- For documenting already-built features (use CHANGELOG.md)
- For small, self-contained tasks with no ambiguity
- When the user just wants a quick summary (give a summary, not a PRD)

## Prerequisites

- Recent conversation context or notes from a `grill-me` session
- Understanding of the problem space
- Access to relevant codebase for context (if applicable)

## PRD Format

Use this exact template. Fill in all sections that apply. Delete sections that don't.

```markdown
# PRD: [Feature/Product Name]

**Status:** Draft | Review | Approved
**Created:** YYYY-MM-DD
**Author:** AI Agent (from discussion with [user])
**Version:** 1.0

---

## Executive Summary

2-3 sentences. What are we building and why? Anyone should understand this.

---

## Problem Statement

What problem does this solve? Who has this problem? How do they solve it today
(if at all)? Include specific pain points.

---

## Goals

- **Goal 1:** What we WILL achieve
- **Goal 2:** ...

---

## Non-Goals

- **Non-Goal 1:** What we explicitly will NOT do (scope boundaries)
- **Non-Goal 2:** ...

---

## User Stories

Format: "As a [user type], I want to [action] so that [benefit]."

### Must Have (P0)

- As a [user], I want to [action] so that [benefit].
- As a [user], I want to [action] so that [benefit].

### Should Have (P1)

- As a [user], I want to [action] so that [benefit].

### Nice to Have (P2)

- As a [user], I want to [action] so that [benefit].

---

## Functional Requirements

### FR-1: [Feature Area]

- System must [behavior]
- System must [behavior]
- Edge case: [what happens when...]

### FR-2: [Feature Area]

- ...

---

## Non-Functional Requirements

| Category      | Requirement               | Target      |
| ------------- | ------------------------- | ----------- |
| Performance   | [e.g., API response time] | < 200ms p95 |
| Security      | [e.g., auth mechanism]    | JWT + HTTPS |
| Accessibility | [e.g., WCAG level]        | AA          |
| Reliability   | [e.g., uptime]            | 99.9%       |
| Scalability   | [e.g., concurrent users]  | 1000 CCU    |

---

## Constraints

- **Technical:** Must use [stack/technology]. Must integrate with [system].
- **Timeline:** Needs to ship by [date] or fits into [release].
- **Budget:** [If applicable]
- **Team:** [If known]

---

## Dependencies

- **External:** [Third-party API, service, library]
- **Internal:** [Other team, module, or feature that must be ready first]

---

## Open Questions

- [ ] Question 1 — who can answer this?
- [ ] Question 2 — must resolve before implementation starts
- [ ] Question 3 — can defer to later phase

---

## Success Metrics

How will we know this is successful?

- **Metric 1:** [e.g., 80% of users complete onboarding]
- **Metric 2:** [e.g., support tickets for auth drop by 50%]
- **Metric 3:** [e.g., page load time under 1.5s]

---

## Risks & Mitigations

| Risk                  | Impact | Likelihood | Mitigation                       |
| --------------------- | ------ | ---------- | -------------------------------- |
| [What could go wrong] | High   | Medium     | [How we'll prevent or handle it] |
| [What could go wrong] | Medium | Low        | [How we'll prevent or handle it] |

---

## Appendix

### References

- [Link to design mockup]
- [Link to technical spec]
- [Link to relevant discussion/issue]

### Glossary

- **Term:** Definition
```

## Workflow

### 1. Gather Context

Review the recent conversation. Identify:

- What problem is being solved?
- What did the user explicitly ask for?
- What constraints or preferences did they mention?
- What did they explicitly say NOT to do?

If context is thin, use `grill-me` to fill gaps before creating the PRD.

### 2. Draft the PRD

Write the PRD following the template above. Prioritize:

1. **Executive Summary + Problem Statement** — Most important for alignment
2. **Goals + Non-Goals** — Scope boundaries prevent scope creep
3. **User Stories** — The core of what we're building
4. **Functional Requirements** — Derived from user stories
5. Everything else as applicable

### 3. Fill Gaps with Sensible Defaults

For sections the user hasn't addressed, apply reasonable defaults and mark them clearly:

```markdown
## Non-Functional Requirements

_Not discussed. Assuming standard web app defaults:_

| Category    | Requirement       | Target  |
| ----------- | ----------------- | ------- |
| Performance | API response time | < 500ms |
| Security    | Authentication    | JWT     |
```

### 4. Mark Open Questions

Any assumption that might be wrong goes in **Open Questions**:

```markdown
## Open Questions

- [ ] Should this support offline mode? (assumed NO)
- [ ] Preferred auth provider? (assumed custom JWT)
```

### 5. Present for Review

Present the PRD and ask the user to review:

```
Here's the PRD for [feature]. Key decisions:

- [Decision 1]
- [Decision 2]
- [Decision 3]

Open questions I still have:

- [Question 1]
- [Question 2]

Does this look right? Anything to add or change?
```

### 6. Iterate

Update the PRD based on feedback. Increment version on each significant revision.

## File Naming

Write the PRD to a file named after the feature:

```bash
# In the project root or docs/ directory:
PRD-<feature-name>.md

# Examples:
PRD-user-authentication.md
PRD-search-functionality.md
PRD-admin-dashboard.md
```

If using `project-files`, the PRD can live alongside PLAN.md, SPEC.md, etc.

## Integration with Other Skills

### From `grill-me` → PRD

```
grill-me session clarifies requirements →
  create-prd codifies them into a formal document →
    prd-to-tasks breaks them into implementation tasks →
      implement-tasks executes
```

### To `prd-to-tasks`

The PRD is the input to `prd-to-tasks`. Every user story and functional requirement in the PRD maps to one or more tasks.

### To `mixture-of-experts`

Share the PRD with MoE experts for architecture, security, and performance review:

```bash
PRD_CONTENT=$(cat PRD-feature.md)
pi -p "Review this PRD for completeness, risks, and missing requirements:\n\n$PRD_CONTENT" \
   --system-prompt "You are a senior product manager..."
```

## Examples

### Minimal PRD (for small features)

```markdown
# PRD: Add Dark Mode

**Status:** Draft | **Created:** 2026-04-27 | **Version:** 1.0

## Executive Summary

Add a dark mode toggle to the application. Users have requested this for
reduced eye strain during night use.

## Problem Statement

The app currently only supports light mode. Users working in low-light
environments report eye strain. Competitor apps all support dark mode.

## Goals

- Add dark mode toggle in user settings
- Respect OS-level color scheme preference
- Cover all existing screens and components

## Non-Goals

- Custom theme builder (just light/dark)
- Per-component color overrides
- Scheduled theme switching

## User Stories

### Must Have (P0)

- As a user, I want to toggle between light and dark mode so that I can
  reduce eye strain in low-light environments.
- As a user, I want the app to follow my OS color scheme by default so
  that I don't need to configure it manually.

### Nice to Have (P2)

- As a user, I want my preference to persist across sessions so that
  I don't need to re-set it.

## Functional Requirements

### FR-1: Theme Toggle

- System must provide a toggle in the settings menu
- System must apply the selected theme immediately across all screens
- System must persist the user's choice to localStorage

### FR-2: OS Preference Detection

- System must detect `prefers-color-scheme` on first visit
- If user hasn't set a preference, default to OS preference

## Open Questions

- [ ] Should we animate the theme transition? (leaning: yes, 300ms ease)
```

### Full PRD (for major features)

See the template above — fill all sections for features with significant scope.

## Edge Cases

### No Prior Discussion

If asked to create a PRD with no context:

```
I don't have enough context to create a meaningful PRD.
Let me ask a few questions first (using grill-me):

1. What's the problem we're solving?
2. Who is the target user?
3. What's the scope — MVP or full feature?

Then I'll draft the PRD.
```

### Conflicting Requirements

If the user mentions conflicting requirements, flag them:

```markdown
## Open Questions

- [ ] **CONFLICT:** User wants both "instant load" and "real-time data from slow
      external API." These conflict — which takes priority? Options:
      A) Show cached data instantly, refresh in background
      B) Show loading state, always show fresh data
```

### Feature Creep During Discussion

Keep non-goals tight:

```markdown
## Non-Goals

- ❌ User suggested "also add X while we're at it" — deferred to v2.
- ❌ Integration with Y service — separate PRD if needed later.
```

## Best Practices

- **Keep the executive summary short** — If your mom can't understand it, it's too complex
- **User stories drive everything** — Requirements derive from stories, not the reverse
- **Non-goals are as important as goals** — They prevent scope creep
- **Mark assumptions** — Everything you weren't explicitly told is an assumption
- **One PRD per feature** — Don't combine unrelated features
- **Version the PRD** — Increment on significant changes so readers know if they're stale
- **Link to related docs** — SPEC.md, PLAN.md, design mockups, relevant issues
