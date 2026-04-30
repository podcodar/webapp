#!/usr/bin/env python3
"""
Validate a tasks.json DAG for prd-to-tasks and implement-tasks skills.

Checks:
  1. Valid JSON
  2. All dependency targets exist
  3. No circular dependencies (Kahn's algorithm)
  4. Unique task IDs
  5. Phase keys match referenced phases
  6. Every task has agent and moeExperts fields
  7. Top-level agents key matches task assignments
  8. Topological sort output

Usage:
  python3 validate-dag.py <tasks.json>            # standard validation
  python3 validate-dag.py <tasks.json> --quiet    # exit code only
  python3 validate-dag.py <tasks.json> --summary  # include stats
  python3 validate-dag.py <tasks.json> --order    # print space-separated topological order only
"""

import json
import sys
from collections import deque
from pathlib import Path


def fail(msg: str) -> None:
    print(f"❌ {msg}", file=sys.stderr)
    sys.exit(1)


def warn(msg: str) -> None:
    print(f"⚠️  {msg}", file=sys.stderr)


def ok(msg: str) -> None:
    print(f"✅ {msg}")


def validate(tasks_path: str, quiet: bool = False, summary: bool = False) -> dict:
    """Validate a tasks.json file. Returns stats dict on success."""
    path = Path(tasks_path)
    if not path.exists():
        fail(f"File not found: {tasks_path}")

    # ── 1. Valid JSON ──────────────────────────────────────────────
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as e:
        fail(f"Invalid JSON: {e}")
    if not quiet:
        ok("Valid JSON")

    # ── 2. Required top-level keys ─────────────────────────────────
    if "tasks" not in data:
        fail("Missing required key: 'tasks'")

    tasks_list = data["tasks"]
    if not isinstance(tasks_list, list):
        fail("'tasks' must be an array")

    if not tasks_list:
        warn("Task list is empty — nothing to validate")
        return {"total_tasks": 0, "total_hours": 0, "order": []}

    tasks = {}
    for t in tasks_list:
        tid = t.get("id")
        if not tid:
            fail(f"Task missing 'id' field: {t.get('title', 'UNKNOWN')}")
        if tid in tasks:
            fail(f"Duplicate task ID: {tid}")
        tasks[tid] = t

    task_ids = set(tasks.keys())

    if not quiet:
        ok(f"Parsed {len(tasks)} tasks")

    # ── 3. All dependency targets exist ────────────────────────────
    errors = 0
    for tid, t in tasks.items():
        for dep in t.get("dependencies", []):
            if dep not in task_ids:
                fail(f"{tid} depends on missing task '{dep}'")
                errors += 1

    if not quiet:
        ok("All dependency targets exist" if not errors else f"{errors} missing deps")

    # ── 4. Detect cycles (Kahn's algorithm) + topological sort ─────
    in_degree = {tid: 0 for tid in task_ids}
    adj = {tid: [] for tid in task_ids}
    for tid, t in tasks.items():
        for dep in t.get("dependencies", []):
            adj[dep].append(tid)
            in_degree[tid] += 1

    q = deque([tid for tid, deg in in_degree.items() if deg == 0])
    order = []
    while q:
        tid = q.popleft()
        order.append(tid)
        for neighbor in adj[tid]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                q.append(neighbor)

    if len(order) != len(task_ids):
        remaining = task_ids - set(order)
        fail(f"Circular dependency involving: {', '.join(sorted(remaining))}")

    if not quiet:
        ok("No circular dependencies (valid DAG)")
        if summary:
            print(f"   Topological order: {' → '.join(order)}")

    # ── 5. Phase keys match ────────────────────────────────────────
    if "phases" in data:
        phase_ids = set(data["phases"].keys())
        for t in tasks_list:
            phase = t.get("phase")
            if phase and phase not in phase_ids:
                warn(f"{t['id']} references unknown phase '{phase}'")
    elif not quiet:
        ok("No phases defined (skipping phase validation)")

    # ── 6. Every task has agent and moeExperts ─────────────────────
    missing_agent = [t["id"] for t in tasks_list if not t.get("agent")]
    missing_experts = [t["id"] for t in tasks_list if not t.get("moeExperts")]
    if missing_agent:
        fail(f"Tasks missing 'agent' field: {', '.join(missing_agent)}")
    if missing_experts:
        fail(f"Tasks missing 'moeExperts' field: {', '.join(missing_experts)}")
    if not quiet:
        ok("All tasks have agent and moeExperts fields")

    # ── 7. agents key matches task assignments ─────────────────────
    if "agents" in data:
        for agent_name, agent_data in data["agents"].items():
            listed = set(agent_data.get("tasks", []))
            actual = {t["id"] for t in tasks_list if t.get("agent") == agent_name}
            if listed != actual:
                warn(f"'{agent_name}' task list mismatch:")
                if listed - actual:
                    warn(f"   In agents but not assigned: {sorted(listed - actual)}")
                if actual - listed:
                    warn(f"   Assigned but not in agents: {sorted(actual - listed)}")
        if not quiet:
            ok("Agent summary matches task assignments")
    elif not quiet:
        ok("No agents key (skipping agent validation)")

    # ── 8. Summary stats ───────────────────────────────────────────
    total_hours = sum(t.get("estimatedHours", 0) for t in tasks_list)
    if summary:
        print(f"\n📊 Summary:")
        print(f"   Total tasks: {len(tasks)}")
        print(f"   Total estimated hours: {total_hours}")
        print(f"   Phases: {len(data.get('phases', {}))}")
        print(f"   Agents: {len(data.get('agents', {}))}")

        if "phases" in data:
            for phase_id, phase_data in data["phases"].items():
                phase_tasks = phase_data.get("tasks", [])
                phase_hours = sum(
                    tasks[tid]["estimatedHours"]
                    for tid in phase_tasks
                    if tid in tasks and "estimatedHours" in tasks[tid]
                )
                print(f"   {phase_data.get('label', phase_id)}: {len(phase_tasks)} tasks, {phase_hours}h")

    return {
        "total_tasks": len(tasks),
        "total_hours": total_hours,
        "order": order,
    }


def main() -> None:
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <tasks.json> [--quiet] [--summary]", file=sys.stderr)
        sys.exit(2)

    tasks_path = sys.argv[1]
    quiet = "--quiet" in sys.argv
    summary = "--summary" in sys.argv
    order_only = "--order" in sys.argv

    if order_only:
        # Machine-readable: print topological order only (space-separated IDs)
        path = Path(tasks_path)
        data = json.loads(path.read_text())
        tasks_list = data.get("tasks", [])
        tasks = {t["id"]: t for t in tasks_list}
        task_ids = set(tasks.keys())

        in_degree = {tid: 0 for tid in task_ids}
        adj = {tid: [] for tid in task_ids}
        for tid, t in tasks.items():
            for dep in t.get("dependencies", []):
                adj[dep].append(tid)
                in_degree[tid] += 1

        q = deque([tid for tid, deg in in_degree.items() if deg == 0])
        order = []
        while q:
            tid = q.popleft()
            order.append(tid)
            for neighbor in adj[tid]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    q.append(neighbor)

        if len(order) != len(task_ids):
            remaining = task_ids - set(order)
            fail(f"Circular dependency involving: {', '.join(sorted(remaining))}")

        print(" ".join(order))
        sys.exit(0)

    validate(tasks_path, quiet=quiet, summary=summary)
    if not quiet:
        print("\n🎉 Validation passed!")


if __name__ == "__main__":
    main()
