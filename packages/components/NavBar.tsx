import { Box, Button, Container, Flex, Grid, Image, Link, Text } from "@chakra-ui/react";
import Logo from "@packages/icons/Logo";

function NavBar() {
  const menuItems = [
    <Link key="home" href="/">
      Home
    </Link>,
    <Link key="member" href="/">
      Members
    </Link>,
    <Button key="cta">Join</Button>,
  ];

  return (
    <Container p="0.5rem" display="flex" maxW={"5xl"}>
      <Flex flex="1" alignItems="center">
        <Logo size="small" />
        <Text m="0 0.5rem" fontWeight="bold">PodCodar</Text>
      </Flex>

      <Grid gap="1rem" templateColumns={`repeat(${menuItems.length}, auto)`} alignItems="center">
        {menuItems}
      </Grid>
    </Container>
  );
}

export default NavBar;
