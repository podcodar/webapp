import NextLink, { LinkProps } from 'next/link';
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';

interface Props extends Omit<ChakraLinkProps, 'href'> {
  href: LinkProps['href'];
}
export default function Link({ children, href = '', ...props }: Props) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}
