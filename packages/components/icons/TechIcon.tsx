import type { HTMLAttributes } from "react";

export type TechIconProps = HTMLAttributes<SVGElement> & {
	title: string;
};

export const TechIcon = ({ title, ...props }: TechIconProps) => {
	return (
		<svg
			width="64px"
			height="64px"
			viewBox="0 0 128 128"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label={title}
			{...props}
		/>
	);
};
