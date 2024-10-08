import TeamPage from "@packages/components/TeamPage";
import { db } from "@packages/repositories/db";
import { membersTable } from "@packages/repositories/db/schema";

export default async function Team() {
  const members = await fetchMembers();

  return <TeamPage members={members} />;
}

async function fetchMembers() {
  "use server";
  const testimonials = await db.select().from(membersTable);
  return testimonials.map((member) => ({
    ...member,
    name: shortName(member.name),
  }));
}

const shortName = (name: string) => name.split(" ").slice(0, 2).join(" ");
