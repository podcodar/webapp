---
name: tmux-automation
description: Run commands in detached tmux sessions and programmatically send input, capture output, and manage sessions
---

# Tmux Automation Skill

## When to Use This Skill

Use this skill when you need to:
- Run interactive CLI tools (vim, git rebase, REPLs) from scripts
- Execute long-running commands that survive terminal disconnect
- Automate interactive workflows programmatically
- Run commands in a persistent session across multiple operations

## Key Commands

### Create Detached Session

```bash
# Basic detached session
tmux new-session -d -s <session-name> "<command>"

# With working directory
tmux new-session -d -s <session-name> -c /path/to/dir "<command>"

# Simple shell session (no command)
tmux new-session -d -s <session-name>
```

### Send Input to Session

```bash
# Send text and execute (note: Enter is separate argument)
tmux send-keys -t <session> 'echo "hello"' Enter

# Send special keys
tmux send-keys -t <session> C-c        # Ctrl+C
tmux send-keys -t <session> Escape      # ESC
tmux send-keys -t <session> Up           # Arrow keys
tmux send-keys -t <session> Down
tmux send-keys -t <session> Tab

# Multiple keys in sequence
tmux send-keys -t <session> 'i' 'Hello World' Escape ':wq' Enter
```

### Capture Session Output

```bash
# Capture visible pane content
tmux capture-pane -t <session> -p

# Capture entire scrollback
tmux capture-pane -t <session> -p -S -1000
```

### Manage Sessions

```bash
# Check if session exists
tmux has-session -t <session> 2>/dev/null && echo "exists"

# Kill session when done
tmux kill-session -t <session>

# List all sessions
tmux ls
```

## Target Format

Sessions are referenced as:
- `session-name` — session (window 0)
- `session-name.0` — first window in session
- `session-name:0` — alternative syntax for window
- `session-name.0.0` — specific pane (window 0, pane 0)

## Workflow Pattern

```bash
# 1. Create detached session and wait for init
SESSION="my-session"
tmux new-session -d -s "$SESSION" "python manage.py shell"
sleep 0.3  # Wait for initialization

# 2. Send commands and capture output
tmux send-keys -t "$SESSION" 'from users.models import User' Enter
tmux send-keys -t "$SESSION" 'User.objects.count()' Enter
OUTPUT=$(tmux capture-pane -t "$SESSION" -p)
echo "$OUTPUT"

# 3. Clean up
tmux kill-session -t "$SESSION"
```

## Common Key Names

| Key | tmux send-keys value |
|-----|---------------------|
| Enter | `Enter` |
| Escape | `Escape` |
| Tab | `Tab` |
| Ctrl+C | `C-c` |
| Ctrl+D | `C-d` |
| Ctrl+X | `C-x` |
| Up/Down/Left/Right | `Up`, `Down`, `Left`, `Right` |
| Home | `Home` |
| End | `End` |

## Best Practices

1. **Always wait after session creation** — Add 100-500ms sleep before first capture/send
2. **Use descriptive session names** — Makes debugging easier
3. **Clean up when done** — Always kill-session to avoid orphaned sessions
4. **Check session exists** — Before sending keys, verify with `has-session`
5. **Enter is a separate argument** — Don't include it in the text string
6. **Use -c for working directory** — Ensures commands run in correct location

## Example Use Cases

### Run Django Management Command
```bash
SESSION="django-migrate"
tmux new-session -d -s "$SESSION" "python manage.py migrate"
sleep 2
tmux capture-pane -t "$SESSION" -p
tmux kill-session -t "$SESSION"
```

### Interactive Python REPL Automation
```bash
SESSION="python-repl"
tmux new-session -d -s "$SESSION" "python"
sleep 0.3
tmux send-keys -t "$SESSION" 'import json' Enter
tmux send-keys -t "$SESSION" 'print(json.dumps({"a": 1}))' Enter
tmux capture-pane -t "$SESSION" -p
tmux send-keys -t "$SESSION" 'exit()' Enter
tmux kill-session -t "$SESSION"
```

### Run Long-Remaining Server
```bash
SESSION="dev-server"
tmux new-session -d -s "$SESSION" -c /project "npm run dev"
# Session persists, can check output anytime
tmux capture-pane -t "$SESSION" -p
# When done:
tmux kill-session -t "$SESSION"
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank screen on capture | Add `sleep 0.3` after session creation |
| Command not executing | Send explicit `Enter` key as separate argument |
| `\n` doesn't work | Use `Enter` not `\n` |
| Session not found | Check with `tmux has-session -t <name>` first |
| Keys sent to wrong window | Use `session:window.pane` format explicitly |