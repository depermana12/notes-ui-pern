import { Container } from "@chakra-ui/react";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <Container maxW="1200px" mx="auto">
      <NavMenu />
    </Container>
  );
};
export default Navbar;
