import { LocalizedText } from "@packages/locale/context";
import type { SelectMember } from "@packages/repositories/db/schema";
import SocialIconLinks from "./SocialIconLinks";

interface Props {
  member: SelectMember;
}

export default function MemberCard({ member }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white text-center shadow-xl">
      <img className="h-28 w-full object-cover" src={member.cover} alt="member cover" />
      <div className="mt-[-3rem] flex justify-center">
        <img className="h-20 w-20 rounded-full border-2 border-white" src={member.avatar} alt="member avatar" />
      </div>

      <div className="grid gap-2 p-8">
        <h2 className="font-semibold text-xl">{member.name}</h2>
        <p className="text-gray-400 text-sm">
          <LocalizedText token={`team-page.role.${member.role}`} />
        </p>
        <SocialIconLinks githubUrl={member.github} linkedinUrl={member.linkedin} />
      </div>
    </div>
  );
}
