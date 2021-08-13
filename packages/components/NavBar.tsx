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
      px={4}
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
            <Grid
              flex={1}
              gridTemplateColumns={`repeat(${communityLinks.length}, auto)`}
              columnGap="1rem"
            >
              {communityLinks}
            </Grid>
          </Box>
          <Grid
            gridTemplateColumns={`repeat(${socialIcons.length}, auto)`}
            columnGap="1rem"
          >
            {socialIcons}
          </Grid>
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
            pb={4}
            display={{ sm: 'none' }}
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
