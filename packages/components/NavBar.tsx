import {
  Box,
  Button,
  Container,
  IconButton,
  Flex,
  Divider,
  Stack,
  Text,
  useDisclosure,
  HStack,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useMemo } from "react";

import { Logo } from "@packages/components/icons";
import { useI18n } from "@packages/features/i18n-context";
import { links } from "@packages/config/site";
import Link from "@packages/components/Link";

import ToggleThemeButton from "./ToggleThemeButton";
import ToggleLanguage from "./ToggleLanguage";
import SocialIconLinks from "./SocialIconLinks";

const actionButtons = [
  <SocialIconLinks key="social-buttons" />,
  <ToggleLanguage key="toggle-lang" />,
  <ToggleThemeButton key="toggle-theme" />,
];

function NavBar() {
  const { t } = useI18n("navbar");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbarBgColor = useColorModeValue("gray.50", "gray.900");

  const communityLinks = useMemo(
    () => [
      <Link key="team" href={links.team}>
        {t("team")}
      </Link>,
      <Link key="wiki" target="_blank" href={links.wiki}>
        {t("wiki")}
      </Link>,
      <Link key="forum" target="_blank" href={links.forum}>
        {t("forum")}
      </Link>,
    ],
    [t],
  );

  return (
    <Box position="fixed" w="100%" top={0} shadow="base" zIndex={1} bg={navbarBgColor}>
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
          label={t("join.tooltip")}
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
            {t("join")}
          </Button>
        </Tooltip>
      </Container>

      {isOpen ? (
        <Box px={2} display={{ md: "none" }} backgroundColor={navbarBgColor} paddingBottom="0.5rem">
          <Stack as="nav" spacing={4} m={4}>
            {communityLinks}
          </Stack>
          <Divider />
          <HStack py={2} spacing="1rem" justifyContent="center" fontSize="1.3rem">
            {actionButtons}
          </HStack>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavBar;
