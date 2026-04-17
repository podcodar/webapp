// Called by the "Comment on PR" step in playwright-e2e.yml via actions/github-script.
// Required env vars (injected by the workflow):
//   JOB_STATUS – the value of ${{ job.status }}

const { owner, repo } = context.repo;
const runId = context.runId;
const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${runId}`;
const status = process.env.JOB_STATUS;
const emoji = status === "success" ? "✅" : "❌";
const statusText = status === "success" ? "All tests passed" : "Some tests failed";

const body = [
  `## ${emoji} Playwright E2E — ${statusText}`,
  "",
  `| Detail | Link |`,
  `|--------|------|`,
  `| Workflow run | [View run](${runUrl}) |`,
  `| HTML report  | Download the **playwright-report** artifact from the run page above |`,
  `| Traces & videos | Download the **playwright-results** artifact (attached when tests fail) |`,
  "",
  `> **How to view the HTML report locally:**`,
  `> 1. Download and unzip the \`playwright-report\` artifact.`,
  `> 2. Run \`bunx playwright show-report <path-to-report>\` to open it in your browser.`,
  "",
  `> Traces and videos are captured **on first retry** (failures only).`,
].join("\n");

// Update existing bot comment if one already exists, otherwise create a new one
const { data: comments } = await github.rest.issues.listComments({
  owner,
  repo,
  issue_number: context.issue.number,
});
const existing = comments.find(
  (c) => c.user?.type === "Bot" && c.body?.includes("Playwright E2E"),
);
if (existing) {
  await github.rest.issues.updateComment({
    owner,
    repo,
    comment_id: existing.id,
    body,
  });
} else {
  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: context.issue.number,
    body,
  });
}
