import { db } from "@packages/repositories/db";
import { membersTable, type InsertMember } from "@packages/repositories/db/schema";
import { getMemberInstance } from "@packages/services/members";

const firebaseMembers = getMemberInstance();

async function execute() {
  const membersList = await firebaseMembers.list();

  await Promise.allSettled(
    membersList.map(async (member) => {
      const newMember: InsertMember = {
        name: member.name,
        role: member.communityRole,
        avatar: member.images.profile,
        cover: member.images.cover,
        github: member.social.github,
        linkedin: member.social.linkedin,
      };

      console.log({ member, newMember });
      return db.insert(membersTable).values(newMember);
    }),
  );
}

execute().catch((e) => {
  console.error(e);
  process.exit(1);
});
