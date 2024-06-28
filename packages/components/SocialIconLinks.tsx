import { Stack } from "@chakra-ui/react";

import Link from "@packages/components/Link";
import { links } from "@packages/config/site";
import { GithubIcon, LinkedInIcon } from "@packages/components/icons";

interface Props {
	githubUrl?: string;
	linkedinUrl?: string;
}

export default function SocialIconLinks({ githubUrl = links.github, linkedinUrl = links.linkedin }: Props) {
	return (
		<Stack spacing="1rem" justifyContent="center" direction="row" fontSize="1.3rem">
			<Link key="github" isExternal href={githubUrl} justifySelf="end">
				<GithubIcon />
			</Link>
			<Link key="linkedin" isExternal href={linkedinUrl}>
				<LinkedInIcon />
			</Link>
		</Stack>
	);
}
