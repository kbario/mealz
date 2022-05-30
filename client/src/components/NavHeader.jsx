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
  useMediaQuery,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from '../icons/icons';

function NavHeader({ me, page }) {
  const [isPhone] = useMediaQuery('(max-width:500px)');

  return (
    <Flex w="100%" align="center" bg="brand.light" p="6" pb="0" gap="5">
      <Icon as={Logo} boxSize="10" />
      <Heading variant={page ? 'lightHeading' : 'auto'}>
        {page ? page : 'mealz'}
      </Heading>
      <Spacer />
      {isPhone ? (
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
                <MenuItem>
                  <Link to="/list">list</Link>
                </MenuItem>
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
      ) : (
        <Flex gap="5">
          <NavLink to="/recipes">recipes</NavLink>
          <NavLink to="/plan">plan</NavLink>
          <NavLink to="/list">list</NavLink>
        </Flex>
      )}
    </Flex>
  );
}

export default NavHeader;
