---
name: pr-review
description: >
  Review GitHub pull requests for code quality, security, and best practices.
  Use when the user asks to review a PR, check a pull request, evaluate code changes, or provide feedback on GitHub code.
  Requires `gh` CLI authenticated with appropriate permissions.
  Do NOT use when the user wants to create a PR, merge a PR, or perform other PR operations.
---

# PR Review

Review pull requests thoroughly before providing feedback.

## Prerequisites

1. **Install `gh` CLI** (if not present):

   ```bash
   # macOS
   brew install gh

   # Verify
   gh --version
   ```

2. **Authenticate** (if not logged in):

   ```bash
   gh auth status
   # If not authenticated:
   gh auth login
   ```

3. **Required permissions**: `repo` scope for private repos, `public_repo` for public repos

## Workflow

1. **Identify the PR**
   - Run `gh pr view --json url,title,body,headRefName,baseRefName,changedFiles`
   - Or use the PR URL the user provided
   - Note the PR author for context-aware feedback

2. **Fetch the diff**
   - Run `gh pr diff <number>` or fetch via `curl` if URL was provided
   - For large PRs (>20 files), run `gh pr diff <number> --stat` first to triage

3. **Review systematically**
   - Check each changed file
   - Look at the full context, not just the diff hunk
   - Prioritize: `src/` changes first, then tests, then config/docs

## Review Checklist

### Correctness

- Logic errors or edge cases missed
- Off-by-one errors
- Incorrect error handling

### Security

- Injection vulnerabilities (SQL, command, XSS)
- Exposure of secrets or sensitive data
- Missing authentication or authorization checks

### Maintainability

- Code duplication
- Overly complex functions
- Missing or misleading comments
- Inconsistent naming

### Performance

- Unnecessary loops or repeated computations
- Missing pagination on large datasets
- Inefficient data structures

### Dependencies

- New dependencies are justified
- No duplicate or overlapping libraries
- License compatibility (if applicable)

### Tests

- New features have tests
- Bug fixes have regression tests
- Edge cases are covered

### Accessibility (for UI changes)

- Alt text on images
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### Documentation

- Public API changes documented
- README updated if needed
- CHANGELOG entry for user-facing changes

## Feedback Rules

- **Be specific**: Reference line numbers and file names
- **Explain why**: Every suggestion needs a rationale
- **Balance**: Point out what works well, not just issues
- **Severity**: Label as `[blocker]`, `[warning]`, or `[suggestion]`
- **Actionable**: Provide code snippets or concrete alternatives when possible
- **Ask questions**: If intent is unclear, ask before assuming

## Response Format

```
## Summary
1-2 sentence overview of the PR

## Findings
- [blocker] file:line — description + rationale
- [warning] file:line — description + rationale
- [suggestion] file:line — description + rationale

## Positives
- What was done well

## Questions
- Clarifying questions about unclear decisions

## Recommendations
- Priority-ordered next steps
```

## Handling Large PRs

For PRs with many files (>20 changed files):

1. **Triage by priority:**
   - Review `src/` changes first (business logic)
   - Then tests
   - Then config/docs last

2. **Request scope reduction:**
   - If PR mixes features, suggest splitting
   - Comment: "This PR seems to combine X and Y. Consider splitting into separate PRs."

3. **Use diff stats:**
   ```bash
   gh pr diff <number> --stat
   ```
   Focus review on files with most changes.

## Post-Review Actions

Based on findings, take appropriate action:

### If No Blockers (Approve)

```bash
gh pr review <pr-number> --approve --body "LGTM! [summary of positives]"
```

### If Suggestions Only (Comment)

```bash
gh pr review <pr-number> --comment --body "## Review

[Detailed feedback with suggestions]
```

### If Blockers Found (Request Changes)

```bash
gh pr review <pr-number> --request-changes --body "## Changes Requested

[Blockers and required fixes]
```

## Example Review

```markdown
## Summary

Adds user authentication flow with JWT tokens. Includes login endpoint,
token refresh, and middleware for protected routes.

## Findings

- [blocker] src/auth.ts:42 — Hardcoded JWT secret `const SECRET = "mysecret123"`.
  Move to environment variable to prevent secret exposure in source control.
- [warning] src/middleware.ts:18 — Token expiry set to 30 days, which is unusually
  long. Consider 24 hours with refresh token rotation.
- [suggestion] src/routes/login.ts:7 — Consider rate limiting on login endpoint
  to prevent brute force attacks.

## Positives

- Clean separation of auth concerns into dedicated module
- Good error handling with specific error messages
- Tests cover both success and failure paths

## Questions

- Is the 30-day token expiry intentional for a specific use case?

## Recommendations

1. Move JWT secret to environment variable (blocking)
2. Add rate limiting middleware for auth routes
3. Consider shorter token expiry with refresh rotation
4. Add integration test for full login → protected route flow
```
