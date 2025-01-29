import TeamPage from "@packages/components/TeamPage";
import { getDatabase } from "@packages/repositories/db";
import { type LoaderFunctionArgs, useLoaderData } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const db = getDatabase(context);
  const members = await db.members;
  return { members };
}

export default function Team() {
  const { members } = useLoaderData<typeof loader>();

  return <TeamPage members={members} />;
}
