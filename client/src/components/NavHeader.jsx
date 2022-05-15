import { useTheme, Flex, Spacer, Button, Menu, MenuButton, MenuList, MenuItem, ScaleFade, Heading } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function NavHeader() {

    const theme = useTheme();

    return (
    <Flex w="100%" h="20" align="center" bg="brand.light" p="4">
        <Heading >MyRepos</Heading>
        <Spacer />
        <Menu>
            {({ isOpen }) => (
            <>
                <MenuButton isActive={isOpen} as={Button}>
                    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>
                <MenuList>
                    <MenuItem>Download</MenuItem>
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
