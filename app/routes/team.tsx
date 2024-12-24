import TeamPage from "@packages/components/TeamPage";
import { db } from "@packages/repositories/db";
import { membersTable } from "@packages/repositories/db/schema";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
	const members = await db.select().from(membersTable);
	return { members };
}

export default function Team() {
	const { members } = useLoaderData<typeof loader>();

	return <TeamPage members={members} />;
}
