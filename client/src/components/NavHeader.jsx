import { useTheme, Flex, Spacer, Button, Menu, MenuButton, MenuList, MenuItem, ScaleFade, Heading } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function NavHeader() {

    const theme = useTheme();

    return (
    <Flex w="100%" align="center" bg="brand.light" p="6">
        <Heading>mealz</Heading>
        <Spacer />
        <Menu>
            {({ isOpen }) => (
            <>
                <MenuButton isActive={isOpen} as={Button}>
                    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>
                <MenuList>
                    <MenuItem>recipes</MenuItem>
                    <MenuItem>plan</MenuItem>
                    <MenuItem>list</MenuItem>
                    <MenuItem><ColorModeSwitcher /></MenuItem>
                    <MenuItem onClick={() => alert('Kagebunshin')}>
                        Create a Copy
                    </MenuItem>
                </MenuList>
            </>
            )}
        </Menu>
    </Flex>
    )
}

export default NavHeader;
