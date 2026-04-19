# Learnings Registry

All captured learnings from the AI Diamond Chain are registered here.

## How to Add a Learning

1. After each diamond completion or significant event
2. Determine the learning type (skill/agent/workflow/reference)
3. Create the skill/doc in appropriate location
4. Add entry below with date, title, type, summary, location, confidence

---

## Format

```markdown
## [Date] - [Learning Title]
- **Type:** skill/agent/workflow/reference
- **Source:** Which diamond/event produced this
- **Summary:** 1-2 sentence description
- **Location:** Link to where it's stored
- **Confidence:** 🔴🟡🟢
```

---

## 2026-04-17 - Continuous Learning System
- **Type:** skill
- **Source:** User request to create learning rules
- **Summary:** Created continuous-learning skill and supporting docs to ensure all learnings are captured, condensed for reuse, and documented for long-term reference
- **Location:** `.opencode/skills/continuous-learning/SKILL.md`, `.opencode/learnings/registry.md`, `.opencode/docs/templates/learning-entry.md`
- **Confidence:** 🟢 High

---

## 2026-04-17 - Tmux Automation Skill
- **Type:** skill
- **Source:** User request for tmux skill for detached session control
- **Summary:** Created tmux-automation skill with commands for creating detached sessions, sending keys programmatically, capturing output, and session management
- **Location:** `.opencode/skills/tmux-automation/SKILL.md`
- **Confidence:** 🟢 High

---

## 2026-04-18 - DaisyUI v5 Custom Theme Configuration
- **Type:** skill
- **Source:** Implementation Diamond - Custom theme creation for PodCodar brand
- **Summary:** Learned DaisyUI v5's new `@plugin "daisyui/theme"` syntax with OKLCH color format, created light/dark theme pair with PodCodar brand colors (tech blues + warm amber accents), disabled default themes for clean implementation
- **Location:** `.opencode/skills/daisyui-v5-themes/SKILL.md`, `src/styles/global.css`
- **Confidence:** 🟢 High