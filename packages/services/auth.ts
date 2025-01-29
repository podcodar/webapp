import { GitHubAuth } from "@m3o/auth";
import { ADMIN_ROUTES } from "@packages/contants";
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
    signIn: ADMIN_ROUTES.signIn,
    signOut: ADMIN_ROUTES.signOut,
    refresh: "/admin/auth/refresh",
    callback: "/admin/auth/callback",
  });

  return auth;
}
