import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import { useModalActions } from '@packages/features/modal-context';
import Logo from '@packages/icons/Logo';
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';

function NavBar() {
  const { open } = useModalActions();
  const menuItems = [
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
    <Link key="github" target="_blank" href="https://github.com/podcodar">
      <AiOutlineGithub style={{ height: '30px', width: '30px' }} />
    </Link>,
    <Link
      key="linkedin"
      target="_blank"
      href="https://www.linkedin.com/company/podcodar/"
    >
      <AiFillLinkedin style={{ height: '30px', width: '30px' }} />
    </Link>,
    <Button
      key="cta"
      colorScheme={'purple'}
      bg={'purple.400'}
      _hover={{ bg: 'purple.500' }}
      onClick={open}
    >
      Join
    </Button>,
  ];

  return (
    <Container p="0.5rem" display="flex" maxW={'5xl'}>
      <Flex flex="1">
        <Link href="/" display="flex" alignItems="center">
          <Logo size="small" />
          <Text m="0 0.5rem" fontWeight="bold">
            PodCodar
          </Text>
        </Link>
      </Flex>
      <Grid
        gap="1rem"
        templateColumns={`repeat(${menuItems.length}, auto)`}
        alignItems="center"
      >
        {menuItems}
      </Grid>
    </Container>
  );
}

export default NavBar;
