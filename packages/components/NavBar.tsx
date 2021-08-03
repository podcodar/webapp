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

function NavBar() {
  const { open } = useModalActions();
  const menuItems = [
    <Link key="home" href="/">
      Home
    </Link>,
    <Link key="member" href="/">
      Members
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
