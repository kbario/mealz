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
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { NavLink, Link } from 'react-router-dom';
import { Logo } from '../icons/icons';
import { useState } from 'react';
import Auth from '../utils/auth';

function NavHeader({ me, page }) {
  const [isPhone] = useMediaQuery('(max-width:500px)');
  const [url] = useState(
    window.location.href.split('/')[window.location.href.split('/').length - 1]
  );

  return (
    <Flex w="100%" align="center" bg="brand.light" p="6" pb="0" gap="5">
      <Link to="/home">
        <Icon as={Logo} boxSize="10" />
      </Link>
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
              </MenuList>
            </>
          )}
        </Menu>
      ) : (
        <Flex gap="6">
          <NavLink to="/recipes">
            <Text variant={url === 'recipes' ? 'navlinkActive' : 'navlink'}>
              recipes
            </Text>
          </NavLink>
          <NavLink to="/plan">
            <Text variant={url === 'plan' ? 'navlinkActive' : 'navlink'}>
              plan
            </Text>
          </NavLink>
          <NavLink to="/list">
            <Text variant={url === 'list' ? 'navlinkActive' : 'navlink'}>
              list
            </Text>
          </NavLink>
          <Text variant="navlink" onClick={() => Auth.logout()}>
            logout
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

export default NavHeader;
