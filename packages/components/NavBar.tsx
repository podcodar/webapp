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

function NavBar() {
  const { open } = useModalActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const socialIcons = [
    <Link
      key="github"
      target="_blank"
      href="https://github.com/podcodar"
      padding={isOpen ? '0 5px' : ''}
    >
      <GithubIcon />
    </Link>,
    <Link
      key="linkedin"
      target="_blank"
      href="https://www.linkedin.com/company/podcodar/"
      padding={isOpen ? '0 5px' : ''}
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

  return (
    <Box px={4} position="fixed" w="100%" top={0} shadow="base" zIndex={2}>
      <Container
        p="0.5rem"
        display="flex"
        maxW={'5xl'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ base: 'inherit', md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Link href="/" display="flex" alignItems="center">
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>

        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
          {menuItems}
          <Button
            key="cta"
            colorScheme="purple"
            bg="purple.400"
            _hover={{ bg: 'purple.500' }}
            onClick={open}
          >
            Join
          </Button>
        </HStack>
      </Container>

      {isOpen ? (
        <>
          <Box pb={4} display={{ md: 'none' }} backgroundColor="white">
            <Stack as={'nav'} spacing={4}>
              {communityLinks}
            </Stack>
            <Divider />
            <Flex justifyContent={'center'} paddingTop="5px">
              {socialIcons}
            </Flex>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export default NavBar;
