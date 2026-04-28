---
name: markdown-format
description: >
  Format and lint Markdown files following standard conventions and best practices.
  Use when the user asks to format markdown, lint markdown files, fix markdown formatting,
  or ensure markdown follows style guidelines.
  Do NOT use when the user wants to convert between formats (Markdown to HTML, etc.)
  or when processing non-Markdown content.
---

# Markdown Formatting

Format and validate Markdown files to ensure they follow consistent style guidelines, proper syntax, and best practices for readability and maintainability.

## Prerequisites

No specific tools required - formatting can be done manually following the guidelines below.

Optional tools for automated formatting:

- `markdownlint-cli` - CLI tool for linting Markdown
- `prettier` - Code formatter with Markdown support
- `markdownlint-cli2` - Extended linting rules

Install globally:

```bash
npm install -g markdownlint-cli prettier
```

Or use without installing:

```bash
npx markdownlint "**/*.md"
npx prettier --write "**/*.md"
```

## When to Use

- User asks to format or lint Markdown files
- Ensuring consistent Markdown style across a project
- Fixing syntax errors in Markdown documents
- Preparing Markdown for publication or documentation
- Validating YAML frontmatter in Markdown files
- Converting inconsistent formatting to standard style

## When NOT to Use

- Converting Markdown to other formats (HTML, PDF, etc.)
- Processing non-Markdown content (use language-specific formatters)
- Complex document transformations or restructuring
- When user explicitly requests to skip formatting checks

## Core Guidelines

### Heading Structure

- Use `#` for the main title (H1) - one per file
- Use `##` for major sections (H2)
- Use `###` for subsections (H3)
- Avoid skipping levels (don't go from H2 to H4)
- Leave one blank line before and after headings

**Good:**

```markdown
# Main Title

## Section One

### Subsection A

Content here.

## Section Two

More content.
```

**Bad:**

```markdown
# Main Title

## Section One

Content here.
```

### Lists

- Use `-` (dash) for unordered bullet points
- Use `1.`, `2.` for ordered lists (sequential steps)
- Indent nested lists with 2 spaces
- Leave blank lines before and after lists

**Good:**

```markdown
- First item
- Second item
  - Nested item
  - Another nested
- Third item
```

### Code Blocks

- Always specify the language for syntax highlighting
- Use triple backticks (```) not indentation
- Leave blank lines before and after code blocks

**Good:**

````markdown
Here's how to run the command:

```bash
npm install
npm run dev
```
````

The server will start on port 3000.

````

### Inline Formatting

- Use `**bold**` for emphasis on key terms
- Use `*italic*` for subtle emphasis or introducing terms
- Use inline code for commands, filenames, and technical terms: `` `command` ``
- Use `>` for notes and callouts

### Links

- Use descriptive link text, not raw URLs
- Prefer reference-style links for repeated URLs

**Good:**
```markdown
Read the [documentation](https://example.com/docs) for more details.

[documentation]: https://example.com/docs
````

### YAML Frontmatter

- Use `---` delimiters at the top of the file
- Ensure valid YAML syntax
- Common fields: `title`, `description`, `date`, `tags`

```markdown
---
title: Document Title
description: Brief description of the document
date: 2024-01-15
tags:
  - markdown
  - formatting
---
```

## Commands

If you have the tools installed:

```bash
# Check all markdown files
markdownlint "**/*.md"

# Fix auto-fixable issues
markdownlint --fix "**/*.md"

# Format with Prettier
prettier --write "**/*.md"
```

Or use via npx without installing:

```bash
npx markdownlint --fix "**/*.md"
npx prettier --write "**/*.md"
```

## Common Rules

| Rule ID | Description                                            | Fixable |
| ------- | ------------------------------------------------------ | ------- |
| MD001   | Heading levels should only increment by one level      | No      |
| MD003   | Heading style must be consistent                       | Yes     |
| MD009   | Trailing spaces not allowed                            | Yes     |
| MD012   | Multiple consecutive blank lines not allowed           | Yes     |
| MD013   | Line length (default: 80 chars)                        | No      |
| MD022   | Headings should be surrounded by blank lines           | Yes     |
| MD031   | Fenced code blocks should be surrounded by blank lines | Yes     |
| MD032   | Lists should be surrounded by blank lines              | Yes     |
| MD033   | Inline HTML not allowed                                | No      |
| MD038   | Spaces inside code span elements                       | Yes     |
| MD040   | Fenced code blocks should have a language specifier    | No      |
| MD041   | First line in file should be a top level heading       | No      |
| MD047   | File should end with a single newline                  | Yes     |
| MD048   | Code fence style should be consistent                  | Yes     |

## Examples

### Formatting a Single File

```bash
markdownlint --fix README.md
```

### Formatting All Markdown in a Project

```bash
# Find and fix all markdown files
markdownlint --fix "**/*.md"

# Or with Prettier
prettier --write "**/*.md"
```

### Creating a .markdownlint.json Config

```json
{
  "default": true,
  "MD013": {
    "line_length": 100,
    "heading_line_length": 100,
    "code_block_line_length": 120
  },
  "MD024": {
    "allow_different_nesting": true
  },
  "MD033": {
    "allowed_elements": ["details", "summary", "br"]
  }
}
```

### Validating YAML Frontmatter

```bash
# Check frontmatter syntax
markdownlint --config .markdownlint.json file.md

# Manual check with yq
yq eval '.title' file.md
```

## Edge Cases / Troubleshooting

### Issue: markdownlint not found

```bash
# Install globally
npm install -g markdownlint-cli

# Or use npx without installing
npx markdownlint "**/*.md"
```

### Issue: Too many errors on first run

```bash
# Fix auto-fixable issues first
markdownlint --fix "**/*.md"

# Then review remaining issues
markdownlint "**/*.md"
```

### Issue: Tables breaking formatting

Tables may not render properly with strict line length rules. Disable MD013 for table lines or use HTML tables for complex cases.

### Issue: Mixed heading styles

```bash
# Fix inconsistent heading styles
markdownlint --fix --config '{"MD003": {"style": "atx"}}' file.md
```

### Issue: Special characters in code blocks

Backticks in code examples may need escaping or alternative fence lengths:

````markdown
```javascript
// Code with backticks
const str = `template literal`;
```
````

## Best Practices

1. **Configure once, apply everywhere** - Create a `.markdownlint.json` in project root
2. **Integrate in CI** - Add markdownlint to your linting pipeline
3. **Editor integration** - Use extensions for VS Code, Vim, etc.
4. **Pre-commit hooks** - Use husky + lint-staged to format on commit
5. **Document exceptions** - Use `<!-- markdownlint-disable -->` sparingly with comments explaining why
6. **Be consistent** - Pick heading styles, list markers, and code fence styles and stick to them
7. **Optimize for readers** - Formatting should improve readability, not just pass linting

## VS Code Extension

Install the `DavidAnson.vscode-markdownlint` extension for real-time feedback and auto-fixing.

## Integration Example

Add to your project scripts:

```json
{
  "scripts": {
    "lint:md": "markdownlint '**/*.md' --ignore node_modules",
    "lint:md:fix": "markdownlint --fix '**/*.md' --ignore node_modules",
    "format:md": "prettier --write '**/*.md'"
  }
}
```

Or use in CI:

```yaml
# .github/workflows/lint.yml
- name: Lint Markdown
  run: |
    npm install -g markdownlint-cli
    markdownlint '**/*.md'
```
