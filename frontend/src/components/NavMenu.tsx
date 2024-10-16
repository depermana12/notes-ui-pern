import {
  Flex,
  Heading,
  HStack,
  Link,
  ListItem,
  Spacer,
  UnorderedList,
} from "@chakra-ui/react";
import { FileCode2 } from "lucide-react";

const NavMenu = () => {
  return (
    <Flex as="nav">
      <HStack>
        <FileCode2 size={30} />
        <Heading as="h1">Notes</Heading>
      </HStack>
      <Spacer />
      <UnorderedList
        display="flex"
        alignItems="center"
        gap="2"
        listStyleType="none"
      >
        <ListItem>
          <Link href="/docs">Documentation</Link>
        </ListItem>
        <ListItem>
          <Link href="/settings">Settings</Link>
        </ListItem>
      </UnorderedList>
    </Flex>
  );
};
export default NavMenu;
