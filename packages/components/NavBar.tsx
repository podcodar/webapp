import { Box, Button, Container, Flex, Grid, Image, Link } from "@chakra-ui/react";

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
      <Box flex="1">
        <Image textAlign="left" height="2rem" src="/vercel.svg" alt="logo" />
      </Box>

      <Grid gap="1rem" templateColumns={`repeat(${menuItems.length}, auto)`} alignItems="center">
        {menuItems}
      </Grid>
    </Container>
  );
}

export default NavBar;
