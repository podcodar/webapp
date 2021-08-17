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
  HStack,
  useDisclosure,
  HStack,
  Grid,
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

function NavBar() {
  const { open } = useModalActions();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      w="100%"
      top={0}
      shadow="base"
      zIndex={1}
      bg="gray.50"
    >
      <Container p="0.5rem" display="flex" maxW={'5xl'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ sm: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Link
          href="/"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w={{ base: '100%', sm: 'auto' }}
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
          d={{ base: 'none', sm: 'flex' }}
        >
          <Box>
            <HStack spacing="1rem">{communityLinks}</HStack>
          </Box>
          <HStack spacing="1rem">{socialIcons}</HStack>
        </Flex>

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
            px={2}
            display={{ sm: 'none' }}
            backgroundColor="white"
            paddingBottom="0.5rem"
          >
            <Stack as={'nav'} spacing={4} m={4}>
              {communityLinks}
            </Stack>
            <Divider />
            <HStack spacing="1rem" justifyContent={'center'} py={2}>
              {socialIcons}
            </HStack>
          </Box>
        </>
      ) : null}
    </Box>
  );
}

export default NavBar;
