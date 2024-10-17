"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { Logo } from "@packages/components/icons";
import { links } from "@packages/config/site";
import { classes } from "@packages/utils/classes";

import Link from "@packages/components/Link";
import { LocalizedText } from "@packages/features/i18n-context";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbarBgColor = useColorModeValue("bg-gray-50", "bg-gray-900");

  return (
    <div className={classes("navbar fixed p-0 shadow-md flex flex-col", navbarBgColor)}>
      <Container p="1rem" display="flex" justifyContent="space-between" maxW="5xl">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Link
          href="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={{ base: "100%", md: "auto" }}
          p={1}
        >
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>

        <Flex
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          p=" 0 1rem"
          display={{ base: "none", md: "flex" }}
        >
          <Box>
            <HStack spacing="1rem">{communityLinks}</HStack>
          </Box>
          <HStack spacing="1rem" fontSize="1.2rem">
            {actionButtons}
          </HStack>
        </Flex>

        <Tooltip
          hasArrow
          shouldWrapChildren
          w={40}
          bg="purple.400"
          fontWeight="bold"
          textAlign="center"
          label={<LocalizedText token="navbar.join-tooltip" />}
        >
          <Button
            isDisabled
            key="cta"
            minW="5rem"
            bg="purple.400"
            colorScheme="purple"
            data-testid="join-button"
            _hover={{ bg: "purple.500" }}
          >
            <LocalizedText token="navbar.join" />
          </Button>
        </Tooltip>
      </Container>

      {isOpen ? (
        <Stack px={2} display={{ md: "none" }} backgroundColor={navbarBgColor} paddingBottom="0.5rem">
          <Stack as="nav" spacing={4} m={4}>
            {communityLinks}
          </Stack>
          <Divider />
          <HStack py={2} spacing="1rem" justifyContent="center" fontSize="1.3rem">
            {actionButtons}
          </HStack>
        </Stack>
      ) : null}
    </div>
  );
}

export default NavBar;
