---
name: continuous-learning
description: Capture and organize learnings after each diamond completion or significant discovery to create reusable knowledge
---

# Continuous Learning Skill

## When to Use This Skill

Use this skill whenever:
- A Learn & Feed phase completes
- A Discovery or Implementation Diamond finishes
- A significant discovery is made during any phase
- An agent learns something that could improve future actions

## What This Skill Does

This skill ensures all learnings are properly captured, condensed, and organized for future reuse.

## Workflow

### Step 1: Identify the Learning

Ask: "What did we learn that is new and reusable?"

Categorize the learning:
- **Skill** - reusable pattern for >=2 future tasks
- **Agent behavior** - changes how an agent should act
- **Workflow** - process/methodology improvement
- **Reference** - one-off insight for documentation only

### Step 2: Create or Update Skills

If the learning is reusable (>=2 tasks), create a skill:

Location: `.opencode/skills/[skill-name]/SKILL.md`

```yaml
---
name: <skill-name>
description: <what this skill does and when to use it>
---

# Skill Content
```

### Step 3: Update Agent Files

If the learning changes agent behavior, update the relevant agent file:
- Edit `.opencode/agent/[agent].md`
- Add new instructions under appropriate section

### Step 4: Update Documentation

For long-term reference, create or update docs:

| Learning Type | Location |
|---------------|----------|
| Technical | `.opencode/docs/technical/` |
| Workflow/Process | `.opencode/docs/process/` |
| Project-specific | `.maestro/[project]/learned-report.md` |

### Step 5: Register the Learning

Add entry to `.opencode/learnings/registry.md`:

```markdown
## [Date] - [Learning Title]
- **Type:** skill/agent/workflow/reference
- **Source:** Which diamond/event
- **Summary:** 1-2 sentence description
- **Location:** Link to where it's stored
- **Confidence:** 🔴🟡🟢
```

## Documentation Standards

- Use templates from `.opencode/docs/templates/`
- Include confidence level (🔴🟡🟢) on each learning
- Link related learnings across files
- Tag for searchability

## Key Principles

- **Condense, don't just记录** - Write reusable rules, not raw notes
- **If in doubt, create it** - Better to have it and not need it
- **Link everything** - Cross-reference related learnings
- **Review registry monthly** - Consolidate similar learnings