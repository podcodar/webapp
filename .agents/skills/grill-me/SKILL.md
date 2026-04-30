---
name: grill-me
description: >
  Interview the human-in-the-loop to clarify ambiguous requests before taking action.
  Use when the user's request is vague, missing key details, or has multiple valid interpretations.
  Do NOT use when the request is clear and unambiguous, or when the clarification can be
  resolved by reading code, docs, or a quick web search.
---

# Grill Me — Human-in-the-Loop Clarification

> **⚠️ THIS SKILL ONLY ASKS QUESTIONS.**
> It never writes code, creates files, edits text, or implements anything.
> When clarification is done, hand off to another skill (e.g. `create-prd`,
> `prd-to-tasks`) or return control to the user.

Interview the user to resolve ambiguities before executing. Always attempt self-service research first. When questions remain, ask exactly **one question per turn** and wait for the answer before continuing.

## Core Principle

> **Don't guess. Don't assume. Don't flood with questions.** Research first, then ask one thing at a time.

## When to Use

- The user's request is ambiguous or open to multiple interpretations
- Key constraints are missing (language, framework, target platform, scope)
- The user references something that doesn't exist in the codebase
- Trade-offs exist and the user hasn't expressed a preference
- The request contradicts existing code or conventions

## When NOT to Use

- The request is clear, specific, and all parameters are known
- The ambiguity can be resolved by reading files already in the workspace
- The answer is a well-known fact (use web search instead)
- The user explicitly said "just do it" or "use your best judgment"
- **You intend to implement something.** This skill never writes code, creates files,
  or edits text. It only asks questions. Use `implement-tasks`, `prd-to-tasks`,
  or direct execution for building.

## Process

### Step 1: Self-Service Research

Before asking the human, exhaust these sources **in order**:

```bash
# 1. Search the codebase
grep -r "<keyword>" --include="*.ts" --include="*.tsx" .
rg "<pattern>" .

# 2. Read relevant existing files
cat src/<likely-relevant-file>.ts
ls src/<likely-relevant-dir>/

# 3. Check project documentation
cat README.md
cat AGENTS.md
ls docs/

# 4. Web search (if applicable)
# Use your built-in web search for: library docs, error messages, best practices
```

**Decision point:** If ALL questions are answered by the above, the request is clear — exit
and hand off to the appropriate skill. If ANY ambiguity remains, go to Step 2.

### Step 2: Identify the Most Critical Unknown

Scan your remaining questions and pick the **single most blocking** one — the question whose answer has the biggest impact on subsequent decisions. Priority order:

1. **Scope questions** — What exactly are we building? ("Full auth system or just login?")
2. **Constraint questions** — What are the hard limits? ("Must it work offline?")
3. **Preference questions** — Which of these valid options? ("REST or GraphQL?")
4. **Detail questions** — Specific parameter values ("How many items per page?")

### Step 3: Ask ONE Question

Frame it clearly with context and options:

```
I've reviewed the codebase and found [relevant context].

Before I proceed, one question: [clear, specific question]?

Options:
- A: [option with brief rationale]
- B: [option with brief rationale]
- C: [something else — you tell me]
```

### Step 4: Wait for Answer → Loop

Receive the answer, integrate it into your understanding, then:

- If ambiguities remain → go back to Step 2 (ask the next question)
- If everything is clear → go to Step 5 (exit and hand off)

### Step 5: Exit — Hand Off, Don't Build

Once all critical ambiguities are resolved:

1. **Summarize** the clarified requirements in a structured format
2. **Recommend** the next skill to use (e.g. `create-prd`, `prd-to-tasks`,
   `implement-tasks`) or ask the user what they'd like to do next
3. **Stop.** Do not write code, create files, or make edits.

Example exit:

```
Got it. Here's the clarified plan:

- Provider: Itaú PIX API
- Flow: donation form → checkout with QR code → thank-you page
- Architecture: stateless, Cloudflare Workers
- Pages: /contributing (form), /donate (checkout), /thank-you (success)

Ready to turn this into a PRD with `create-prd`. Want me to proceed?
```

## Question Templates

### Scope Clarification

```
I see [existing code/pattern]. For this request, should I:
- A: Extend the existing [component/module]?
- B: Create a new standalone [component/module]?
- C: Replace the existing one entirely?
```

### Constraint Discovery

```
Before I design this, are there any constraints I should know about?
- Must work with: [existing system/library]?
- Performance targets: [specific numbers]?
- Deadline or priority: [urgent vs nice-to-have]?
```

### Preference Between Valid Options

```
I can implement this two ways:
- A: [approach] — simpler, but [trade-off]
- B: [approach] — more flexible, but [trade-off]

Which do you prefer?
```

## Anti-Patterns

| Don't                                   | Do Instead                                                |
| --------------------------------------- | --------------------------------------------------------- |
| Ask 5 questions at once                 | Ask the most important one, let the answer guide the next |
| Ask questions answerable by `grep`      | Search the codebase first                                 |
| Ask "What do you want?" with no options | Present concrete options with trade-offs                  |
| Guess and hope it's right               | Spend 30 seconds asking vs hours redoing                  |
| Keep asking when 80% clarity is enough  | Accept reasonable defaults for low-impact details         |

## Examples

### Good: One Question at a Time

**User:** "Add authentication to the API"

**Agent (reads codebase first):**

```
I see you have a Hono API in src/api/ with existing route handlers.
No auth middleware exists yet.

One question: Should I use JWT tokens or session-based auth?
- A: JWT — stateless, simpler to implement, works well with SPA frontends
- B: Sessions — stateful, easier to revoke, requires session store
```

**User:** "JWT"

**Agent:**

```
Got it. I see src/api/middleware/ is empty. One more: should
authentication be global (all routes) or per-route opt-in?
- A: Global middleware on all /api/* routes
- B: Per-route with an `authRequired()` helper
```

### Good: Resolving Contradictions

**User:** "Use the same color scheme as the dashboard"

**Agent (reads codebase):**

```
I checked src/styles/ and found two color schemes:
- dashboard-legacy.css (last modified 2023)
- dashboard-v2.css (last modified 2024, used by DashboardV2.tsx)

Which one should I use?
```

### Bad: Too Many Questions

```
❌ "Before I start, I need to know:
1. JWT or sessions?
2. Global or per-route?
3. Which token expiry?
4. Where to store refresh tokens?
5. Should I add rate limiting?"

✅ Ask question 1, get answer, then ask question 2, etc.
```

## Edge Cases

### User Says "Just Pick Something"

When the user defers, use sensible defaults and document them:

```
OK, I'll go with:
- JWT (stateless, standard for SPAs)
- Per-route opt-in (less invasive)
- 24h expiry with refresh rotation

If any of these don't work, just say "change X to Y" and I'll adjust.
```

### User Gives Vague Answers

If the answer doesn't resolve the ambiguity, rephrase:

```
Sorry, just to make sure I understand — when you say [their answer],
does that mean [specific interpretation A] or [specific interpretation B]?
```

### The Request Is Fundamentally Unclear

If after 2-3 rounds the request still doesn't make sense, reset:

```
I want to make sure I'm on the right track. Could you describe the
problem you're trying to solve, rather than the solution? What's the
user-facing goal here?
```

## Integration with Other Skills

### With `mixture-of-experts`

Use grill-me to clarify the problem statement before spawning experts:

```
1. Grill the user to get a clear problem definition
2. Feed that definition to mixture-of-experts for analysis
3. Present MoE synthesis back to user
```

### With `create-prd`

Clarify scope and constraints via grill-me, then feed the answers into create-prd:

```
1. Grill user on scope, constraints, and priorities
2. Exit grill-me → invoke create-prd with the clarified requirements
3. Review PRD with user (one more grill-me pass if needed)
```

### With `implement-tasks`

Use grill-me to resolve ambiguous tasks in tasks.json before delegating. Once
ambiguities are resolved, exit grill-me and hand back to the implementation flow.

## Best Practices

- **Front-load scope questions** — Everything else depends on scope
- **Present options, not open-ended prompts** — Reduces cognitive load on the user
- **Show your work** — Tell the user what you checked before asking
- **Accept "I don't know"** — Note it as an assumption and move on
- **Timebox** — If the user seems stuck, offer to prototype both options
- **Keep a mental (or file-based) decision log** — Don't re-ask answered questions
