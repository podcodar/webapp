---
name: brainstorm
description: >
  Facilitate structured brainstorming sessions to generate, explore, and refine
  ideas before committing to requirements. Use when the user has a vague concept,
  wants to explore possibilities, needs creative solutions, or is in the early
  ideation phase. Do NOT use when the requirements are already clear and the user
  is ready to plan implementation (use create-prd or prd-to-tasks instead).
---

# Brainstorm — Structured Idea Generation

> **⚠️ THIS SKILL ONLY GENERATES AND REFINES IDEAS.**
> It never writes code, creates files, edits text, or implements anything.
> When brainstorming is done, hand off to another skill (e.g. `create-prd`,
> `grill-me`) or return control to the user.

Guide the user through a structured ideation process: first diverge (generate many ideas without judgment), then converge (evaluate, prioritize, and refine). Act as a creative facilitator — provoke new angles, challenge assumptions, and help the user see possibilities they haven't considered.

## Core Principle

> **Diverge before converging. Quantity over quality early. No judgment during generation.**
> Expand the possibility space first, then narrow with intention.

## When to Use

- The user has a vague concept or "napkin sketch" and wants to explore it
- The user says "I want to build something like…" but details are undefined
- The user feels stuck and needs fresh perspectives
- The user wants to explore trade-offs between multiple approaches
- The user asks "what are my options?" or "how could I do this?"
- A problem exists but the solution space hasn't been mapped

## When NOT to Use

- The requirements are already clear and specific (use `create-prd`)
- The user just needs clarification on an existing plan (use `grill-me`)
- The user is ready to break down tasks and assign work (use `prd-to-tasks`)
- The user wants to start coding immediately with a clear spec
- The question is purely factual (use web search or codebase exploration)
- **You intend to implement something.** This skill only generates and organizes ideas.
  Use `implement-tasks`, `prd-to-tasks`, or direct execution for building.

## Process

### Phase 1: Frame the Problem

Before generating ideas, make sure the problem or goal is clearly articulated.
Ask the user to describe:

- **What** they want to accomplish (the goal, not the solution)
- **Who** it's for (target audience, users, stakeholders)
- **Why** it matters (the motivation, the pain point)
- **Constraints** they're already aware of

```
Before we brainstorm, let's frame the problem:

- What's the goal? (What does success look like?)
- Who is this for? (Target audience / users)
- Why now? (What's the motivation or trigger?)
- Any constraints you already know about? (Tech, time, budget, scope)
```

**If the user can't articulate the problem clearly, start there.** Use `grill-me`
techniques (one question at a time) until the problem space is defined enough
to generate ideas around it.

### Phase 2: Diverge — Generate Ideas

This is the expansion phase. Generate as many ideas as possible. **No criticism, no
filtering, no "that won't work."** Quantity is the goal.

#### Techniques (pick 1–2 per session based on context)

**🔄 Analogies & Metaphors**
Borrow ideas from other domains. "How does [company/product] solve a similar problem?"
"How would a [chef/librarian/game designer] approach this?"

**🔀 Constraint Inversion**
Flip a constraint and see what emerges. "What if we had unlimited budget? Zero budget?
One day to ship? A year to ship? Only one button on the page? No database?"

**🧩 Decomposition**
Break the problem into independent pieces and brainstorm each separately.
"What are the sub-problems? Let's generate ideas for each one."

**👥 Role Storming**
Adopt different personas. "How would a [power user/new user/competitor/child/CEO]
approach this? What would they care about?"

**🎲 Random Stimulus**
Introduce a random constraint or starting point to break mental ruts.
"What if this had to work offline-first? What if it was voice-only? What if
it was designed for a smartwatch?"

**🔙 Reverse Brainstorming**
Instead of "how do we solve X?", ask "how do we cause X?" or "how do we make
X worse?" Then reverse the answers into solutions.

**📋 SCAMPER**
Run through: Substitute, Combine, Adapt, Modify, Put to another use, Eliminate,
Reverse. Apply each verb to the current approach.

#### Facilitation Rules During Divergence

| Rule                                 | Why                                                 |
| ------------------------------------ | --------------------------------------------------- |
| No judgment ("Yes, and…" not "But…") | Criticism kills creativity prematurely              |
| Go for quantity (aim for 10+ ideas)  | The first ideas are rarely the best                 |
| Encourage wild ideas                 | Wild ideas can be tamed; tame ideas can't be wilded |
| Build on each idea                   | "What if we took idea #3 and added X?"              |
| One idea at a time                   | Don't bundle unrelated concepts together            |
| Stay focused on the problem          | Don't drift into unrelated territory                |

#### Present Ideas Visually

When sharing generated ideas, use structured formatting:

```
🌊 DIVERGE — Idea Pool

1. [Idea Name]
   - What: One-line description
   - Pros: Key advantage
   - Cons: Key risk (noted but not judged yet)
   - Inspiration: Where this came from

2. [Idea Name]
   ...

💡 Which of these spark your interest? Any you want to explore further
   or combine?
```

### Phase 3: Converge — Evaluate & Prioritize

Once you have a healthy pool of ideas (typically 8–15), shift into evaluation mode.
**Signal the phase change clearly** so the user switches mental modes.

```
🔍 CONVERGE — Let's evaluate.

We have [N] ideas. Let's narrow them down.
```

#### Evaluation Lenses (pick 1–2)

**Impact vs. Effort Matrix**
Plot ideas on a 2×2: High/Low Impact × High/Low Effort.
Start with high-impact, low-effort ideas.

**Criteria Scoring**
Agree on 3–5 criteria (e.g., "fits brand," "technically feasible," "delights users,"
"ship in 2 weeks"). Score each idea 1–5 per criterion.

**Dot Voting**
If multiple stakeholders: "You have 3 votes. Which ideas would you bet on?"

**Risk / Uniqueness Matrix**
Plot: Safe bets (low risk, low uniqueness) vs. Moonshots (high risk, high uniqueness).
Helps balance the portfolio.

**Worst Idea First**
Identify the worst idea. Discuss why it's bad. Use the "why" to sharpen what
"good" looks like, then re-evaluate the pool.

#### Convergence Questions

Ask one at a time (like `grill-me`):

```
Of these ideas, which one:
- Excites you the most? (gut feeling)
- Scares you the most? (might be onto something)
- Feels most "on brand"?
- Would be easiest to prototype this week?
- Would have the biggest impact if it worked?
```

### Phase 4: Refine — Flesh Out the Best Ideas

Take the top 1–3 ideas and deepen them. Don't implement — just add enough detail
to make them actionable for the next step.

#### Refinement Dimensions

- **User flow**: What does the user experience step by step?
- **Technical sketch**: What are the key components / data model / API surface?
- **Risk mapping**: What could go wrong? What's the hardest part?
- **Success metrics**: How would we know if this worked?
- **MVP slice**: What's the smallest version that would test the core hypothesis?
- **Open questions**: What do we still not know?

### Phase 5: Exit — Hand Off, Don't Build

Once ideas are refined:

1. **Summarize** the top idea(s) with their key attributes
2. **Recommend** the next skill (usually `create-prd` or `grill-me` for clarification)
3. **Stop.** Do not write code, create files, or make edits.

Example exit:

```
🎯 Brainstorm Complete — Top Idea

Name: "PIX Donation Widget"
What: Embeddable PIX QR code widget for content creators
Key flow: Creator configures → gets embed code → fans scan & donate
MVP slice: Single static QR code page with amount selector
Risks: PIX API rate limits, mobile QR scanning UX
Open questions: Recurring donations? Creator dashboard?

Ready to turn this into a PRD with `create-prd`. Want me to proceed?
```

## Anti-Patterns

| Don't                                             | Do Instead                                             |
| ------------------------------------------------- | ------------------------------------------------------ |
| Judge ideas during generation ("That won't work") | Defer all judgment to the converge phase               |
| Jump straight to one "obvious" solution           | Generate at least 8 alternatives first                 |
| Let the user pick the first idea mentioned        | Push for more options, then evaluate systematically    |
| Brainstorm solutions before the problem is clear  | Frame the problem first (Phase 1)                      |
| Flood the user with 20+ undifferentiated ideas    | Present structured idea pool with names and one-liners |
| Implement anything during brainstorming           | Exit and hand off to `create-prd` or `implement-tasks` |
| End without clear next steps                      | Always recommend the next skill or action              |
| Ask "What do you think?" with no structure        | Present evaluation lenses and guided questions         |

## Examples

### Good: Full Brainstorming Session

**User:** "I want to add some kind of community feature to the site."

**Agent (Phase 1 — Frame):**

```
Let's frame the problem before we brainstorm.

- What's the goal? (Engagement? Retention? UGC? Support reduction?)
- Who would participate? (Power users? All users? Guests?)
- Any constraints? (Must it work without accounts? Timeline?)
```

**User:** "Goal is engagement — keep people coming back. All users. No hard timeline."

**Agent (Phase 2 — Diverge):**

```
Got it — boosting engagement for all users. Let me generate some ideas.
I'll use the analogy technique: how do other platforms build community?

🌊 DIVERGE — Idea Pool

1. Discussion Forums
   - What: Topic-based threaded discussions on the site
   - Pros: Deep engagement, SEO content
   - Cons: Moderation burden, cold-start problem
   - Inspiration: Discourse, Reddit

2. Contribution Leaderboard
   - What: Public ranking of top contributors with badges
   - Pros: Gamification drives repeat visits
   - Cons: Can feel competitive, needs critical mass
   - Inspiration: GitHub contributors, Stack Overflow

3. User-Generated Challenges
   - What: Users create and share coding challenges
   - Pros: Endless content, peer learning
   - Cons: Quality control, plagiarism concerns
   - Inspiration: LeetCode community, Codewars

4. Buddy/Mentorship Matching
   - What: Pair users for mutual learning or mentorship
   - Pros: Personalized, high-value connections
   - Cons: Matching algorithm complexity, safety concerns
   - Inspiration: ADPList, Lunchclub

5. Live Co-Working Sessions
   - What: Scheduled virtual rooms for silent co-working
   - Pros: Low moderation, builds habit
   - Cons: Requires real-time infra, timezone friction
   - Inspiration: Focusmate, StudyStream

6. Project Showcase + Feedback
   - What: Users post projects, community gives feedback
   - Pros: Tangible value, portfolio building
   - Cons: Needs review system to prevent spam
   - Inspiration: Dribbble, Product Hunt

7. Interest-Based Squads
   - What: Small persistent groups around topics (e.g., "React devs")
   - Pros: Belonging, high retention
   - Cons: Group management overhead
   - Inspiration: Discord servers, Slack communities

8. Daily/Weekly Prompts
   - What: Automated discussion prompts or mini-challenges
   - Pros: Low-effort content engine, habit-forming
   - Cons: Can feel artificial if not well-designed
   - Inspiration: Duolingo streaks, #100DaysOfCode

💡 Any of these spark your interest?
```

**User:** "I like #6 (showcase) and #7 (squads). Maybe they could work together?"

**Agent (Phase 3 — Converge):**

```
🔍 CONVERGE — Let's evaluate #6 and #7.

Let's use impact vs. effort. For each idea:

#6 Project Showcase
- Impact: High (tangible value, portfolio, social proof)
- Effort: Medium (CRUD + moderation + notification system)

#7 Interest-Based Squads
- Impact: High (belonging drives retention)
- Effort: High (group management, moderation tools, real-time chat?)

One question: which of these two would be easier to prototype
this week as an MVP test?
```

**User:** "Showcase for sure — squads needs too much infra."

**Agent (Phase 4 — Refine):**

```
🎯 Let's flesh out Project Showcase:

- User flow: User creates project → adds description/screenshots/links →
  submits → appears in gallery → others upvote/comment
- MVP slice: Simple gallery page + submission form. No comments or
  upvotes yet. Just "show" + "browse."
- Technical sketch: New content collection (projects), form component,
  gallery page with filters
- Risk: Cold start — empty gallery is sad. Mitigation: seed with 3–5
  example projects from the team
- Success metric: 10 user-submitted projects in first month
- Open question: Should projects be tied to user accounts?

Ready to turn this into a PRD with `create-prd`. Want me to proceed?
```

### Good: Breaking a Mental Block

**User:** "I need a homepage hero section but I have no idea what to put there."

**Agent:**

```
Let me use the role-storming technique. I'll describe how different
people might approach this:

🌊 DIVERGE — Hero Section Ideas

1. The Minimalist (inspired by Apple)
   - Big bold headline + one sentence + one CTA button
   - "Learn to code. In Portuguese. For free."
   - Why: No cognitive load, clear action

2. The Social-Proofer (inspired by Stripe)
   - Animated code demo as the background + stats overlay
   - "Join 5,000+ Brazilian developers already learning"
   - Why: Credibility through numbers

3. The Storyteller (inspired by Linear)
   - Rotating testimonials from real users with photos
   - "PodCodar helped me land my first dev job"
   - Why: Emotional connection

4. The Tool-Shower (inspired by Vercel)
   - Interactive mini-demo of the product right in the hero
   - A tiny code editor that runs in the browser
   - Why: Show, don't tell

5. The Question-Asker (inspired by Basecamp)
   - Provocative question as headline, answer below
   - "What if learning to code felt like joining a community, not a classroom?"
   - Why: Engages curiosity

💡 Which of these directions feels right for PodCodar's personality?
```

### Bad: Premature Judgment

```
❌ "Homepage hero? Just put a big heading and a CTA button.
    That's what everyone does."

✅ Generate multiple distinct approaches first, then evaluate which
   fits the brand.
```

### Bad: Skipping the Problem Frame

```
❌ User: "I want to add chat."
   Agent: "OK, here are 10 ways to add chat: WebSocket, SSE,
   polling, third-party widget..."

✅ Agent: "Before we brainstorm chat solutions — what problem
   would chat solve? Real-time support? Community building?
   1-on-1 mentoring?"
```

## Edge Cases

### User Has Too Many Ideas Already

If the user comes in with 10+ ideas and just wants help choosing:

```
You already have a great idea pool. Let's skip divergence and go
straight to convergence. Which evaluation lens would help most?
- Impact vs. Effort?
- Criteria scoring (you define the criteria)?
- Gut-check: which 3 would you bet on?
```

### User Has Only One Idea and Is "Sure"

```
Even if this is the one, let's spend 3 minutes generating alternatives
as a stress test. If your idea survives the comparison, you'll have
more confidence. If a new idea beats it, we just saved weeks of work.

Sound fair? Let me generate 5 quick alternatives...
```

### The Problem Itself Is Undefined

Use `grill-me` techniques to define the problem first, then brainstorm:

```
Before we brainstorm solutions, I want to make sure I understand the
problem. (Switch to grill-me mode for 2–3 questions to frame it.)
```

### User Wants to Brainstorm Implementation Details

That's architectural design, not this skill. Redirect:

```
This skill is for product/feature ideation. For technical architecture
brainstorming, I'd recommend using `mixture-of-experts` with the
architect agent. Want me to switch?
```

### User Keeps Expanding Instead of Converging

Gently nudge toward convergence:

```
We have 17 ideas now — that's a rich pool. I'd suggest we move to
convergence before we lose focus. Want me to help prioritize, or
do you want to keep generating?
```

## Integration with Other Skills

### Into → `create-prd`

The most common handoff. Brainstorm generates the concept, `create-prd` formalizes it:

```
Brainstorm → refine top idea → hand off to create-prd with the summary
```

### Into → `grill-me`

When brainstorming surfaces an ambiguity that needs human input:

```
Brainstorm generates ideas → ambiguity about scope/constraints emerges →
switch to grill-me to clarify → return to brainstorm (converge phase)
```

### Into → `mixture-of-experts`

When you need deep technical analysis of an idea before committing:

```
Brainstorm selects top idea → spawn mixture-of-experts with architect,
researcher, and UX designer → review their synthesis → converge further
```

### From → `explore`

When the user wants to brainstorm within an existing codebase:

```
Explore the codebase first → understand current patterns and constraints →
brainstorm ideas that fit the existing architecture
```

### Into → `prd-to-tasks`

When the idea is already detailed enough to skip the PRD:

```
Brainstorm + refine → idea is concrete and well-defined →
prd-to-tasks (skip create-prd if the summary is sufficient)
```

## Facilitation Cheat Sheet

| Situation                                | Technique to Use                     |
| ---------------------------------------- | ------------------------------------ |
| "I have no ideas"                        | Analogies, Random Stimulus           |
| "I have too many ideas"                  | Impact/Effort Matrix, Dot Voting     |
| "All my ideas feel the same"             | Constraint Inversion, SCAMPER        |
| "My idea feels risky"                    | Risk/Uniqueness Matrix, Worst Idea   |
| "I don't know what users want"           | Role Storming, Reverse Brainstorming |
| "I need a fresh angle on an old problem" | Constraint Inversion, Analogies      |
| "We disagree on which idea is best"      | Criteria Scoring, Dot Voting         |
| "The idea is picked but feels shallow"   | Phase 4 Refine dimensions            |

## Best Practices

- **Phase clearly** — Signal "now we're diverging" vs. "now we're converging"
- **Use visual dividers** — `🌊 DIVERGE`, `🔍 CONVERGE`, `🎯 REFINE` helps the user
  switch mental modes
- **Push past the obvious** — The first 3–5 ideas are usually the most conventional.
  Keep going until something surprising emerges.
- **Build on ideas** — "What if we take idea #2 and idea #5 and combine them?"
- **Timebox** — Divergence: 5–10 minutes. Convergence: 3–5 minutes. Refinement: 5 minutes.
- **Document everything** — Even rejected ideas. They often resurface later in a
  different context.
- **Stay neutral** — Facilitate, don't advocate. If you have a preference, disclose it
  and explain why.
- **Know when to stop** — When the user's energy shifts from "exploring" to "deciding,"
  move to convergence.
