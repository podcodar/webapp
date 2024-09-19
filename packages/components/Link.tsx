import NextLink, { type LinkProps } from "next/link";
import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from "@chakra-ui/react";

interface Props extends Omit<ChakraLinkProps, "href"> {
  href: LinkProps["href"];
}
export default function Link({ children, href = "", ...props }: Props) {
  if (!href) return children;
  return (
    <NextLink href={href} passHref>
      <ChakraLink href={href.toString()} {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
}
