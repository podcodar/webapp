---
name: terminal-multiplexer
description: >
  Run and manage background terminal sessions using tmux.
  Use when the user needs to start long-running processes, run multiple commands in parallel,
  keep tasks alive after disconnecting, or check on background job status.
  Do NOT use for simple one-off commands or when user explicitly requests alternative tools (screen, nohup).
---

# Terminal Multiplexer

Use tmux to manage background terminal sessions.

## Prerequisites

Verify tmux is installed before use:

```bash
# Check if tmux is available
command -v tmux >/dev/null 2>&1 || {
    echo "Error: tmux is not installed"
    echo "Install with: brew install tmux (macOS) or apt install tmux (Linux)"
    exit 1
}
```

## When to Use

- Long-running processes (servers, builds, downloads)
- Parallel execution of multiple commands
- Keeping tasks alive after SSH disconnect
- Capturing output from background jobs

## When NOT to Use

- Simple one-off commands that complete quickly
- When user explicitly requests alternatives (screen, nohup)
- Interactive applications requiring full terminal features

## Core Commands

### Session Management

```bash
# Create and attach to a new session
tmux new-session -s <name>

# Create a detached session (background)
tmux new-session -d -s <name>

# List all sessions
tmux ls

# Attach to an existing session
tmux attach -t <name>

# Rename a session
tmux rename-session -t <old-name> <new-name>

# Kill a session
tmux kill-session -t <name>
```

### Sending Commands

```bash
# Run a command in a detached session
tmux send-keys -t <name> "<command>" C-m

# Example: start a server in the background
tmux new-session -d -s api-server
tmux send-keys -t api-server "bun run dev" C-m
```

### Capturing Output

```bash
# Capture the latest pane output
tmux capture-pane -p -t <name>

# Capture to a file
tmux capture-pane -t <name> && tmux save-buffer /tmp/output.txt

# Capture last N lines
tmux capture-pane -p -t <name> | tail -n 20
```

## Common Workflows

### Start a Background Server

```bash
tmux new-session -d -s server -n app
tmux send-keys -t server "npm start" C-m
```

### Run Multiple Tasks in Parallel

```bash
tmux new-session -d -s jobs -n worker1
tmux send-keys -t jobs:worker1 "npm run build:client" C-m

tmux new-window -t jobs -n worker2
tmux send-keys -t jobs:worker2 "npm run build:server" C-m
```

### Check if a Process Finished

```bash
tmux capture-pane -p -t <name> | tail -n 20
```

### Monitoring a Background Process

```bash
# Start a build in background
tmux new-session -d -s build -n compile
tmux send-keys -t build:compile "npm run build 2>&1 | tee build.log" C-m

# Check progress
tmux capture-pane -p -t build:compile | tail -n 10

# When done, check exit code
tmux send-keys -t build:compile "echo $?" C-m
tmux capture-pane -p -t build:compile | tail -n 1
```

### Detaching and Reattaching

```bash
# User is in a session, needs to disconnect
# Press: Ctrl-b d (detach)

# Later, reattach
tmux attach -t <name>

# Or attach to most recent session
tmux attach
```

## Troubleshooting

### Session Already Exists

```bash
# Check existing session
tmux ls | grep <name>

# Attach to existing session
tmux attach -t <name>

# Or kill and recreate
tmux kill-session -t <name>
tmux new-session -d -s <name>
```

### Session Not Found

```bash
# List all sessions
tmux ls

# Common cause: session name typo
# Use tab completion or exact name from `tmux ls`
```

### Command Not Executing in Session

```bash
# Verify session exists and is responsive
tmux list-panes -t <name>

# Send command with explicit enter
tmux send-keys -t <name> "<command>" C-m

# Wait and check output
sleep 2
tmux capture-pane -p -t <name>
```

## Best Practices

- Name sessions descriptively (e.g., `dev-server`, `test-runner`)
- Kill sessions when done to free resources
- Use `tmux ls` to check existing sessions before creating new ones
- Prefer detached sessions (`-d`) for background tasks
- Use `tmux send-keys` over `tmux new-session` for existing sessions
