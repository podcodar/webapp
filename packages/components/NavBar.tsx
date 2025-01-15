import { useState } from "react";

import { Logo } from "@packages/components/icons";
import { links } from "@packages/config/site";

import Link from "@packages/components/Link";
import { LocalizedText, WithLocalizedText } from "@packages/locale/context";
import SocialIconLinks from "./SocialIconLinks";
import ToggleLanguage from "./ToggleLanguage";
import ToggleThemeButton from "./ToggleThemeButton";
import { CloseIcon } from "./icons/CloseIcon";
import { HamburgerIcon } from "./icons/HamburgerIcon";

const communityLinks = [
	<Link key="team" href={links.team}>
		<LocalizedText token={"navbar.team"} />
	</Link>,
	<Link key="transparency" href={links.transparency}>
		<LocalizedText token={"navbar.transparency"} />
	</Link>,
];

const actionButtons = [
	<SocialIconLinks key="social-buttons" />,
	<ToggleLanguage key="toggle-lang" />,
	<ToggleThemeButton key="toggle-theme" />,
];

function NavBar() {
	const [isOpen, setIsOpen] = useState(false);
	const onOpen = () => setIsOpen(true);
	const onClose = () => setIsOpen(false);

	return (
		<div className="navbar fixed flex flex-col bg-base-100 p-0 shadow-md z-10">
			<div className="navbar z-10 mx-auto max-w-5xl gap-4 bg-base-100">
				<button
					type="button"
					className="btn btn-ghost md:hidden"
					onClick={isOpen ? onClose : onOpen}
				>
					{isOpen ? <CloseIcon /> : <HamburgerIcon />}
				</button>

				<Link
					href="/"
					className="flex w-full items-center justify-center gap-2 md:w-auto"
				>
					<Logo size="small" />
					<p className="mx-1 font-bold text-lg">PodCodar</p>
				</Link>

				<div className="hidden w-full items-center justify-between md:flex">
					<div className="flex gap-4">{communityLinks}</div>
					<div className="flex gap-2">{actionButtons}</div>
				</div>

				<WithLocalizedText token="navbar.join">
					{({ text }) => (
						<div className="tooltip tooltip-bottom" data-tip={text}>
							<button
								key="cta"
								type="button"
								aria-label="Join button"
								data-testid="join-button"
								className="btn min-w-5rem bg-purple-400 hover:bg-purple-500"
								disabled
							>
								<LocalizedText token="navbar.join" />
							</button>
						</div>
					)}
				</WithLocalizedText>
			</div>

			{isOpen ? (
				<div className="navbar grid w-full gap-4 bg-base-100 px-20 py-4 text-center sm:px-30 md:hidden">
					<nav className="mx-auto flex gap-4">{communityLinks}</nav>

					<div className="h-[1px] w-100 bg-gray-200" />

					<div className="flex justify-center gap-4 text-md">
						{actionButtons}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default NavBar;
