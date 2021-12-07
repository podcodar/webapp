import { Stack } from '@chakra-ui/react';

import Link from '@packages/components/Link';
import { links } from '@packages/config/site';
import { GithubIcon, LinkedInIcon } from '@packages/components/icons';

export default function SocialIconLinks() {
  return (
    <Stack
      spacing="1rem"
      justifyContent="center"
      direction="row"
      fontSize="1.3rem"
    >
      <Link key="github" isExternal href={links.github} justifySelf="end">
        <GithubIcon />
      </Link>
      <Link key="linkedin" isExternal href={links.linkedin}>
        <LinkedInIcon />
      </Link>
    </Stack>
  );
}
