import { Link } from '@chakra-ui/react';

import { links } from '@packages/config/site';
import { GithubIcon, LinkedInIcon } from '@packages/components/icons';

export default function SocialButtons() {
  return (
    <>
      <Link
        key="github"
        target="_blank"
        href={links.github}
        gridColumnStart="2"
        justifySelf="end"
      >
        <GithubIcon />
      </Link>

      <Link
        key="linkedin"
        target="_blank"
        href={links.linkedin}
        gridColumnStart="3"
      >
        <LinkedInIcon />
      </Link>
    </>
  );
}
