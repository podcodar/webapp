import { GitHubAuth } from "@m3o/auth";
import { raise } from "@packages/utils/typescript";
import type { AppLoadContext } from "react-router";

export function getAuth(context: AppLoadContext): GitHubAuth {
  const auth: GitHubAuth = new GitHubAuth({
    scope: "read:user user:email",
    client_id:
      context.cloudflare.env.GITHUB_CLIENT_ID ??
      raise("GITHUB_CLIENT_ID not found"),
    client_secret:
      context.cloudflare.env.GITHUB_CLIENT_SECRET ??
      raise("GITHUB_CLIENT_SECRET not found"),
  });

  auth.setUrls({
    signIn: "/admin/login",
    signOut: "/admin/auth/logout",
    refresh: "/admin/auth/refresh",
    callback: "/admin/auth/callback",
  });

  return auth;
}
