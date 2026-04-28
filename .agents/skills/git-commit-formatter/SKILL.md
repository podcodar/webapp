---
name: git-commit-formatter
description: >
  Format and write git commit messages using a structured type-based format (fea, fix, ref, ai, oth).
  Use when the user asks to commit, stage, create a commit message, or summarize code changes.
  Do NOT use for merge commits, revert operations, work-in-progress commits, or when user specifies a custom format.
---

# Git Commit Message Formatter

Format all commit messages using this specification.

> **Note:** This skill uses simplified types (`fea`, `fix`, `ref`, `ai`, `oth`) rather than full Conventional Commits (`feat`, `fix`, `refactor`, `chore`, `docs`, etc.) for brevity in AI-generated messages.

## Format

```
<type>(optional scope): <description>
```

All lowercase except proper nouns. No period at the end.

## Types

| Type   | Use when                                     |
| ------ | -------------------------------------------- |
| `fea`  | Adding a new feature                         |
| `fix`  | Fixing a bug                                 |
| `ref`  | Refactoring or restructuring code            |
| `ai`   | AI-related changes (prompts, models, agents) |
| `test` | Adding or correcting tests                   |
| `oth`  | Documentation, config, or anything else      |

## Rules

- Description must be in **imperative mood** ("add feature", not "added feature")
- No period at the end
- Keep the first line under 72 characters
- Add scope only when it clarifies which component changed
- For breaking changes, append a footer: `BREAKING CHANGE: <description>`

## Examples

### Standard Commits

```
fea: add user authentication flow
fix(api): handle null response from downstream service
ref: extract validation logic into shared helper
ai: update system prompt for code review skill
oth: update README with setup instructions
```

### Breaking Change Example

```
fea(api)!: remove legacy authentication endpoint

BREAKING CHANGE: /api/v1/auth endpoint removed. Use /api/v2/auth instead.
```

### Full Workflow Example

**User:** "Commit my changes"

**Agent:**

1. Runs `git diff --cached` — sees staged changes
2. Identifies dominant change: new feature in auth module
3. Generates: `fea(auth): add JWT token refresh flow`
4. Asks: "Commit with message: `fea(auth): add JWT token refresh flow`?"
5. Runs: `git commit -m "fea(auth): add JWT token refresh flow"`

## Process

1. Ensure we're in a git repository (`git status`)
2. Run `git diff --cached` to see staged changes
3. Determine the dominant type from the table above
4. Identify the scope if multiple components exist
5. Write a concise description
6. Ask the user to confirm or run `git commit -m "<message>"`

## Edge Cases

### No Staged Changes

If `git diff --cached` is empty, check `git diff` for unstaged changes. Ask the user if they want to:

1. Stage all changes: `git add -A`
2. Stage specific files: `git add <files>`
3. View changes first: `git diff`

### Empty Repository

If `git status` shows "not a git repo", initialize with `git init` or alert the user.

### Commit Failure

If `git commit` fails (e.g., pre-commit hook rejection), surface the error and ask if the user wants to:

1. Fix the issue and retry
2. Bypass the hook: `git commit --no-verify`
