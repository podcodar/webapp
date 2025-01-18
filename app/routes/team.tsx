import TeamPage from "@packages/components/TeamPage";
import { Database } from "@packages/repositories/db";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = new Database(
    context.cloudflare.env.TURSO_CONNECTION_URL,
    context.cloudflare.env.TURSO_AUTH_TOKEN,
  );
  const members = await db.members;
  return { members };
}

export default function Team() {
  const { members } = useLoaderData<typeof loader>();

  return <TeamPage members={members} />;
}
