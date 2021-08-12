import {
  Box,
  Button,
  Container,
  IconButton,
  Flex,
  Divider,
  Stack,
  Link,
  Text,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useModalActions } from '@packages/features/modal-context';
import { LinkedInIcon, GithubIcon, Logo } from '@packages/components/icons';

const socialIcons = [
  <Link
    key="github"
    target="_blank"
    href="https://github.com/podcodar"
    gridColumnStart="2"
    justifySelf="end"
  >
    <GithubIcon />
  </Link>,
  <Link
    key="linkedin"
    target="_blank"
    href="https://www.linkedin.com/company/podcodar/"
    gridColumnStart="3"
  >
    <LinkedInIcon />
  </Link>,
];

const communityLinks = [
  <Link key="home" target="_blank" href="http://wiki.podcodar.com">
    Wiki
  </Link>,
  <Link
    key="home"
    target="_blank"
    href="https://github.com/podcodar/forum/discussions"
  >
    Fórum
  </Link>,
  <Link key="team" href="/team">
    Equipe
  </Link>,
];

const menuItems = [...communityLinks, ...socialIcons];

function NavBar() {
  const { open } = useModalActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4} position="fixed" w="100%" top={0} shadow="base" zIndex={2}>
      <Container
        p="0.5rem"
        display="grid"
        gridTemplateColumns={{ md: '1fr 1fr 0.2fr', base: '0.5fr 2fr 0.5fr' }}
        maxW={'5xl'}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Link
          href="/"
          display="flex"
          alignItems="center"
          justifyContent={{ md: 'left', base: 'center' }}
        >
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>

        <Container
          gridColumnStart="2"
          justifyContent="flex-end"
          display={{ base: 'none', md: 'flex' }}
        >
          <HStack as="nav" spacing={4}>
            {menuItems}
          </HStack>
        </Container>

        <Button
          key="cta"
          colorScheme="purple"
          bg="purple.400"
          _hover={{ bg: 'purple.500' }}
          onClick={open}
        >
          Join
        </Button>
      </Container>

      {isOpen ? (
        <>
          <Box
            pb={4}
            display={{ md: 'none' }}
            backgroundColor="white"
            paddingBottom="0.5rem"
          >
            <Stack as={'nav'} spacing={4}>
              {communityLinks}
            </Stack>
            <Divider />
            <Flex
              display="grid"
              justifyContent={'center'}
              gridTemplateColumns="1fr 1fr 1fr 1fr"
              gridGap="0.5rem"
            >
              {socialIcons}
            </Flex>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export default NavBar;
