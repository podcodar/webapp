import { Link } from '@chakra-ui/react';

import { links } from '@packages/config/site';
import { GithubIcon, LinkedInIcon } from '@packages/components/icons';

export default function SocialIconLinks() {
  return (
    <>
      <Link key="github" isExternal href={links.github} justifySelf="end">
        <GithubIcon />
      </Link>
      <Link key="linkedin" isExternal href={links.linkedin}>
        <LinkedInIcon />
      </Link>
    </>
  );
}
