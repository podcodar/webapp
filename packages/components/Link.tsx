import NextLink, { type LinkProps } from "next/link";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export default function Link({ children, className, href = "", ...props }: Props) {
  return (
    <NextLink href={href.toString()} className={className} {...props}>
      {children}
    </NextLink>
  );
}
