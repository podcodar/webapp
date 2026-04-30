# AGENTS.md - AI Agent Skills & Rules

This directory contains AI agent skills and project rules for this project.

## Structure

```
.agents/
├── rules/          # Project conventions and rules
│   └── icons.md    # Icon componentization rules
└── skills/         # Skill definitions (SKILL.md files)
    └── my-skill/
        └── SKILL.md
```

## Rules

Rules in `.agents/rules/` are project-level conventions that agents must follow.
They are not skills — they are enforced standards.

| Rule                       | Applies to | Summary                                           |
| -------------------------- | ---------- | ------------------------------------------------- |
| [icons.md](rules/icons.md) | All agents | Never write inline SVGs; use astro-icon or LcIcon |

## Usage

Use the `skills` CLI to manage skills:

```
skills list              # List available skills
skills add my-skill      # Create a new skill
skills install my-skill  # Install a skill
skills uninstall my-skill # Remove a skill
```
