import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from "@chakra-ui/react";

interface Props extends Omit<ChakraLinkProps, "href"> {
  href: ChakraLinkProps["href"];
}
export default function Link({ children, href = "", ...props }: Props) {
  return (
    <ChakraLink href={href.toString()} {...props}>
      {children}
    </ChakraLink>
  );
}
