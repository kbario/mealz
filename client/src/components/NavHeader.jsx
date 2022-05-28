import {
  // useTheme,
  Flex,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

function NavHeader({ me }) {
  // const theme = useTheme();

  return (
    <Flex w="100%" align="center" bg="brand.light" p="6" pb="0">
      <Heading>mealz</Heading>
      <Spacer />
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button}>
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/recipes">recipes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/plan">plan</Link>
              </MenuItem>
              <MenuItem>list</MenuItem>
              <MenuItem as="div">
                <ColorModeSwitcher />
              </MenuItem>
              <MenuItem onClick={() => alert('Kagebunshin')}>
                Create a Copy
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <Menu>
        <MenuButton as={Avatar} name={me?.name}></MenuButton>
        <MenuList>
          <MenuItem>signout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavHeader;
