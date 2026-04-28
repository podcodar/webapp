---
name: subagent-tmux
description: Delegate tasks to isolated sub-agents running in tmux sessions. Use when you need to parallelize work, isolate context, or run long-running tasks without blocking the main session.
---

# Subagent via Tmux

Delegate work to background pi instances running in isolated tmux sessions.

## When to Use

- Run multiple investigations in parallel
- Isolate complex or risky operations
- Execute long-running tasks without blocking
- Get a fresh context window for specific tasks

## Workflow

### 1. Create a Session

```bash
tmux new-session -d -s subagent-<name> -n worker
```

### 2. Run Pi in the Session

```bash
# For simple tasks with output capture
tmux send-keys -t subagent-<name> 'pi -p "<task description>" > /tmp/subagent-<name>.out 2>&1' C-m

# For structured output (JSON mode)
tmux send-keys -t subagent-<name> 'pi --mode json "<task>" > /tmp/subagent-<name>.jsonl 2>&1' C-m
```

### 3. Wait for Completion

```bash
# Check if process is still running
tmux capture-pane -p -t subagent-<name> | tail -5

# Or check if output file is stable (compare file size twice with 2s delay)
ls -la /tmp/subagent-<name>.out
```

### 4. Capture Results

```bash
# Read the output file
cat /tmp/subagent-<name>.out

# For JSON mode, read the structured events
cat /tmp/subagent-<name>.jsonl
```

### 5. Clean Up

```bash
tmux kill-session -t subagent-<name>
rm /tmp/subagent-<name>.out
```

## Complete Example

```bash
# Create session
tmux new-session -d -s subagent-scout -n worker

# Delegate task
tmux send-keys -t subagent-scout 'pi -p "Find all files that import the auth module and summarize their purpose" > /tmp/scout.out 2>&1 && echo "DONE" >> /tmp/scout.out' C-m

# Wait for DONE marker (poll every 2 seconds)
while ! grep -q "DONE" /tmp/scout.out 2>/dev/null; do
  sleep 2
done

# Get results
RESULT=$(cat /tmp/scout.out)

# Clean up
tmux kill-session -t subagent-scout
rm /tmp/scout.out
```

## Parallel Execution

Run multiple subagents simultaneously:

```bash
# Start 3 parallel scouts
for task in "find models" "find controllers" "find tests"; do
  name="scout-${task// /-}"
  tmux new-session -d -s "$name"
  tmux send-keys -t "$name" "pi -p '$task' > /tmp/$name.out && echo DONE >> /tmp/$name.out" C-m
done

# Wait for all
for task in "find models" "find controllers" "find tests"; do
  name="scout-${task// /-}"
  while ! grep -q "DONE" "/tmp/$name.out" 2>/dev/null; do
    sleep 2
  done
  echo "=== $name ==="
  cat "/tmp/$name.out"
  tmux kill-session -t "$name"
  rm "/tmp/$name.out"
done
```

## Advanced: Two-Way Communication

For interactive subagents, use a FIFO (named pipe):

```bash
# Create FIFO
mkfifo /tmp/subagent-in /tmp/subagent-out

# Start pi in tmux with RPC mode
tmux new-session -d -s interactive-agent
tmux send-keys -t interactive-agent 'pi --mode rpc < /tmp/subagent-in > /tmp/subagent-out' C-m

# Send commands to the subagent
echo '{"method": "prompt", "params": {"message": "List files"}}' > /tmp/subagent-in

# Read response
cat /tmp/subagent-out

# Clean up
rm /tmp/subagent-in /tmp/subagent-out
tmux kill-session -t interactive-agent
```

## Best Practices

- **Name sessions clearly**: `subagent-<purpose>-<timestamp>`
- **Always capture output to a file**: Tmux pane buffers are limited
- **Use DONE markers**: Makes polling for completion reliable
- **Set timeouts**: Kill sessions hanging for too long
- **Clean up**: Always remove sessions and temp files when done
- **Check disk space**: Output files can grow large with verbose tasks

## Limitations

- No built-in streaming (must poll for results)
- Context is fully isolated (no shared history)
- Each subagent loads its own skills/extensions
- No automatic retry on failure
