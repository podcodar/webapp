import { GitHubAuth } from "@m3o/auth";
import { raise } from "@packages/utils/typescript";

export const auth: GitHubAuth = new GitHubAuth({
  scope: "read:user user:email",
  client_id:
    process.env.GITHUB_CLIENT_ID ?? raise("GITHUB_CLIENT_ID not found"),
  client_secret:
    process.env.GITHUB_CLIENT_SECRET ?? raise("GITHUB_CLIENT_SECRET not found"),
});

auth.setUrls({
  callback: "/admin/auth/callback",
});
