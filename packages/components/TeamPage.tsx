import MemberCard from "@packages/components/MemberCard";
import Section from "@packages/components/Section";
import SkeletonMemberCard from "@packages/components/SkeletonMemberCard";
import { LocalizedText } from "@packages/locale/context";
import type { SelectMember } from "@packages/repositories/db/schema";

type Props = {
	members: SelectMember[];
};

export default function TeamPage({ members }: Props) {
	return (
		<Section className="py-40">
			<div className="grid gap-10">
				<h1 className="text-center font-semibold text-4xl leading-8 sm:font-xl">
					<LocalizedText
						token={"team-page.title"}
						components={{
							span: <span className="text-purple-400" />,
						}}
					/>
				</h1>

				{members === null ? (
					<SkeletonMemberCard />
				) : members.length === 0 ? (
					<LocalizedText token="team-page.no-items" />
				) : (
					<div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
						{members.map((member) => {
							return <MemberCard member={member} key={member.id} />;
						})}
					</div>
				)}
			</div>
		</Section>
	);
}
