import { Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";

const AvatarMenu = () => {
  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" name="De perma" src="https://bit.ly/broken-link" />
      </MenuButton>
      <MenuList>
        <MenuItem>My Account</MenuItem>
        <MenuItem>Payments </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default AvatarMenu;
