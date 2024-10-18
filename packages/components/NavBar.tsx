"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { Logo } from "@packages/components/icons";
import { links } from "@packages/config/site";

import Link from "@packages/components/Link";
import { LocalizedText, WithLocalizedText } from "@packages/features/i18n-context";
import SocialIconLinks from "./SocialIconLinks";
import ToggleLanguage from "./ToggleLanguage";
import ToggleThemeButton from "./ToggleThemeButton";

const communityLinks = [
  <Link key="team" href={links.team}>
    <LocalizedText token={"navbar.team"} />
  </Link>,
  <Link key="wiki" target="_blank" href={links.wiki}>
    <LocalizedText token={"navbar.wiki"} />
  </Link>,
  <Link key="forum" target="_blank" href={links.forum}>
    <LocalizedText token={"navbar.forum"} />
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
    <div className="navbar fixed p-0 shadow-md flex flex-col bg-base-100">
      <div className="navbar container bg-base-100 gap-4">
        <button type="button" className="btn btn-ghost md:hidden" onClick={isOpen ? onClose : onOpen}>
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <Link href="/" className="flex items-center justify-center w-full md:w-auto gap-2">
          <Logo size="small" />
          <p className="mx-1 text-lg font-bold">PodCodar</p>
        </Link>

        <div className="w-full justify-between items-center hidden md:flex">
          <div className="flex gap-2">{communityLinks}</div>
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
        <div className="navbar grid gap-4 md:hidden w-full py-4 px-20 sm:px-30 bg-base-100 text-center">
          <nav className="flex mx-auto gap-4">{communityLinks}</nav>

          <div className="h-[1px] w-100 bg-gray-200" />

          <div className="flex gap-4 justify-center text-md">{actionButtons}</div>
        </div>
      ) : null}
    </div>
  );
}

export default NavBar;
