import NextLink, { type LinkProps } from "next/link";

type Props = LinkProps & {
  children: React.ReactNode;
  className?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
};

export default function Link({ children, className, target, href = "", ...props }: Props) {
  if (target) {
    const externalLinkIcon = (
      <svg
        role="img"
        aria-label="external link icon"
        className="w-4 h-4 ml-1 inline rotate-[-37deg]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l6-6m0 0l-6-6m6 6H4" />
      </svg>
    );
    return (
      <a target={target} href={href.toString()} className={className} {...props}>
        {externalLinkIcon} {children}
      </a>
    );
  }

  return (
    <NextLink href={href.toString()} className={className} {...props}>
      {children}
    </NextLink>
  );
}
