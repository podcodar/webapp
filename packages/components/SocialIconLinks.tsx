import Link from "@packages/components/Link";
import { GithubIcon, LinkedInIcon } from "@packages/components/icons";
import { links } from "@packages/config/site";

interface Props {
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function SocialIconLinks({ githubUrl = links.github, linkedinUrl = links.linkedin }: Props) {
  return (
    <div className="flex flex-row text-lg justify-center gap-4">
      <Link key="github" isExternal href={githubUrl} justifySelf="end">
        <GithubIcon />
      </Link>
      <Link key="linkedin" isExternal href={linkedinUrl}>
        <LinkedInIcon />
      </Link>
    </div>
  );
}
