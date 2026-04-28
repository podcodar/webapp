---
name: mixture-of-experts
description: Solve complex problems by spawning multiple specialized expert agents that analyze from different angles, then synthesize their insights. Use for architecture decisions, code reviews, complex debugging, or when you need comprehensive analysis.
---

# Mixture of Experts (MoE)

Spawn multiple specialized experts in parallel, each analyzing from a unique angle. Aggregate their insights into a comprehensive, multi-dimensional answer.

## When to Use

- Architecture or design decisions
- Complex code reviews
- Security audits
- Performance optimization
- Debugging tricky issues
- Evaluating trade-offs

## Expert Specializations

### Core Experts

| Expert        | Focus                                                          | System Prompt                                                                                                             |
| ------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `architect`   | Design patterns, coupling, cohesion, long-term maintainability | "You are a software architect. Focus on design patterns, separation of concerns, and long-term maintainability."          |
| `security`    | Vulnerabilities, injection risks, auth flaws, data exposure    | "You are a security engineer. Focus on vulnerabilities, injection risks, authentication, and data exposure."              |
| `performance` | Algorithmic complexity, resource usage, bottlenecks            | "You are a performance engineer. Focus on time/space complexity, resource usage, and optimization opportunities."         |
| `maintainer`  | Readability, documentation, testing, onboarding cost           | "You are a senior maintainer. Focus on code readability, documentation, testing coverage, and onboarding new developers." |
| `minimalist`  | Simplicity, YAGNI, removing unnecessary complexity             | "You are a minimalist engineer. Focus on simplifying, removing unnecessary code, and YAGNI violations."                   |

### Domain Experts

| Expert          | Focus                                                        |
| --------------- | ------------------------------------------------------------ |
| `api-designer`  | REST/GraphQL conventions, versioning, backward compatibility |
| `data-modeler`  | Schema design, normalization, query patterns, migrations     |
| `dx-specialist` | Developer experience, tooling, error messages, debugging     |
| `ops-engineer`  | Deployment, monitoring, observability, rollback strategies   |

## Workflow

### 1. Define the Problem

Create a clear, specific prompt that all experts will analyze:

```
PROBLEM="Review the authentication flow in src/auth/ for issues and improvements"
```

### 2. Spawn Experts in Parallel

```bash
# Define experts to spawn
EXPERTS="architect security performance maintainer"
TASK_ID=$(date +%s)

for expert in $EXPERTS; do
  session="moe-${TASK_ID}-${expert}"
  output="/tmp/${session}.out"

  # Create detached session
  tmux new-session -d -s "$session"

  # Build expert-specific prompt
  case $expert in
    architect)
      SYSTEM="You are a software architect. Analyze the design patterns, coupling, and long-term maintainability."
      ;;
    security)
      SYSTEM="You are a security engineer. Find vulnerabilities, injection risks, and auth flaws."
      ;;
    performance)
      SYSTEM="You are a performance engineer. Identify bottlenecks and optimization opportunities."
      ;;
    maintainer)
      SYSTEM="You are a senior maintainer. Evaluate readability, documentation, and testing."
      ;;
    minimalist)
      SYSTEM="You are a minimalist engineer. Find unnecessary complexity and YAGNI violations."
      ;;
  esac

  # Spawn pi with expert system prompt
  tmux send-keys -t "$session" \
    "pi --system-prompt '$SYSTEM' -p '$PROBLEM' > $output 2>&1 && echo '___EXPERT_DONE___' >> $output" C-m
done
```

### 3. Wait for All Experts

```bash
for expert in $EXPERTS; do
  session="moe-${TASK_ID}-${expert}"
  output="/tmp/${session}.out"

  echo "Waiting for $expert..."
  while ! grep -q "___EXPERT_DONE___" "$output" 2>/dev/null; do
    sleep 2
  done
done
echo "All experts complete"
```

### 4. Aggregate Results

```bash
# Create aggregator prompt
AGGREGATOR_INPUT=""
for expert in $EXPERTS; do
  session="moe-${TASK_ID}-${expert}"
  output="/tmp/${session}.out"

  echo "=== $expert analysis ===" >> /tmp/moe-${TASK_ID}-combined.txt
  cat "$output" | grep -v "___EXPERT_DONE___" >> /tmp/moe-${TASK_ID}-combined.txt
  echo "" >> /tmp/moe-${TASK_ID}-combined.txt
done

# Spawn aggregator
AGG_SESSION="moe-${TASK_ID}-aggregator"
tmux new-session -d -s "$AGG_SESSION"
tmux send-keys -t "$AGG_SESSION" \
  "cat /tmp/moe-${TASK_ID}-combined.txt | pi -p 'Synthesize these expert analyses into a unified recommendation. Identify conflicts, consensus areas, and priority actions. Structure as: 1) Summary, 2) Areas of Agreement, 3) Conflicts/Trade-offs, 4) Recommended Actions (prioritized)' > /tmp/moe-${TASK_ID}-final.out 2>&1 && echo '___AGGREGATOR_DONE___' >> /tmp/moe-${TASK_ID}-final.out" C-m

# Wait for aggregator
while ! grep -q "___AGGREGATOR_DONE___" /tmp/moe-${TASK_ID}-final.out 2>/dev/null; do
  sleep 2
done

# Display final result
cat /tmp/moe-${TASK_ID}-final.out | grep -v "___AGGREGATOR_DONE___"
```

### 5. Cleanup

```bash
# Kill all sessions
for expert in $EXPERTS; do
  tmux kill-session -t "moe-${TASK_ID}-${expert}" 2>/dev/null
done
tmux kill-session -t "moe-${TASK_ID}-aggregator" 2>/dev/null

# Remove temp files
rm -f /tmp/moe-${TASK_ID}-*
```

## Complete Example: Code Review

```bash
#!/bin/bash
# MoE Code Review for a specific file

FILE="src/auth/login.ts"
TASK_ID=$(date +%s)
EXPERTS="architect security performance maintainer"

echo "🔍 Starting Mixture of Experts review of $FILE..."

# Read file content
FILE_CONTENT=$(cat "$FILE")
PROBLEM="Review this code for issues and improvements:\n\n\`\`\`typescript\n$FILE_CONTENT\n\`\`\`"

# Spawn experts
for expert in $EXPERTS; do
  session="moe-${TASK_ID}-${expert}"
  tmux new-session -d -s "$session"

  case $expert in
    architect)
      PROMPT="As an architect, analyze: design patterns, separation of concerns, extensibility, and technical debt. $PROBLEM"
      ;;
    security)
      PROMPT="As a security engineer, find: vulnerabilities, injection risks, auth bypasses, and data leaks. $PROBLEM"
      ;;
    performance)
      PROMPT="As a performance engineer, identify: bottlenecks, unnecessary computations, memory issues, and N+1 queries. $PROBLEM"
      ;;
    maintainer)
      PROMPT="As a maintainer, evaluate: readability, comments, test coverage, error handling, and debuggability. $PROBLEM"
      ;;
  esac

  tmux send-keys -t "$session" "pi -p '$PROMPT' > /tmp/${session}.out 2>&1 && echo DONE >> /tmp/${session}.out" C-m
  echo "  → $expert spawned"
done

# Wait for completion
echo "⏳ Waiting for all experts..."
for expert in $EXPERTS; do
  while ! grep -q "DONE" "/tmp/moe-${TASK_ID}-${expert}.out" 2>/dev/null; do
    sleep 1
  done
  echo "  ✓ $expert complete"
done

# Aggregate
echo "🧠 Synthesizing insights..."
COMBINED=""
for expert in $EXPERTS; do
  OUT=$(cat "/tmp/moe-${TASK_ID}-${expert}.out" | grep -v "DONE")
  COMBINED="$COMBINED\n\n=== $expert ===\n$OUT"
done

echo -e "$COMBINED" | pi -p 'Synthesize these expert reviews into actionable recommendations. Format: Consensus (agreed by 3+ experts), Important (2 experts), Worth Considering (1 expert). Then give top 3 priority fixes.'

# Cleanup
for expert in $EXPERTS; do
  tmux kill-session -t "moe-${TASK_ID}-${expert}" 2>/dev/null
done
rm -f /tmp/moe-${TASK_ID}-*

echo "✅ MoE review complete"
```

## Advanced: Weighted Aggregation

When experts have different importance:

```bash
# Define weights
architect=3
security=3
performance=2
maintainer=2

# Build weighted prompt for aggregator
WEIGHTED_PROMPT="Synthesize with these expert weights:\n"
for expert in $EXPERTS; do
  weight=$(eval echo \$$expert)
  WEIGHTED_PROMPT="$WEIGHTED_PROMPT\n- $expert (weight: $weight/10)"
done
WEIGHTED_PROMPT="$WEIGHTED_PROMPT\n\nHigher weight = more influence on final recommendation."
```

## Best Practices

- **Choose 3-5 experts** — Too few misses angles, too many adds noise
- **Make prompts specific** — Generic prompts yield generic answers
- **Include file content** — Don't make experts hunt for context
- **Define clear aggregation strategy** — Consensus-based, weighted, or hierarchical
- **Cache expert outputs** — Save to files for inspection if aggregation fails
- **Set timeouts** — Kill hung experts after 5 minutes

## Common Patterns

| Scenario           | Expert Mix                                                         |
| ------------------ | ------------------------------------------------------------------ |
| API Design         | `architect`, `api-designer`, `security`, `dx-specialist`           |
| Database Schema    | `data-modeler`, `performance`, `architect`                         |
| Frontend Component | `maintainer`, `minimalist`, `performance`, `dx-specialist`         |
| DevOps Pipeline    | `ops-engineer`, `security`, `maintainer`                           |
| Full Feature       | `architect`, `security`, `performance`, `maintainer`, `minimalist` |

## Limitations

- Expert outputs may conflict (aggregator must resolve)
- Token cost scales linearly with expert count
- No cross-expert communication during analysis
- Synthesis quality depends on aggregator prompt quality
