import { GithubIcon, LinkedInIcon } from "@packages/components/icons";
import { links } from "@packages/config/site";

interface Props {
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function SocialIconLinks({ githubUrl = links.github, linkedinUrl = links.linkedin }: Props) {
  return (
    <div className="flex flex-row text-lg justify-center">
      <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
        <GithubIcon />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
        <LinkedInIcon />
      </a>
    </div>
  );
}
