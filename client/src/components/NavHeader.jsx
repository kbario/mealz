import { Flex, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

function NavHeader() {
    <Flex w="100vw" h="20px" justify="between">

        <Menu>
            {({ isOpen }) => (
            <>
                <MenuButton isActive={isOpen} as={Button} icon={<HamburgerIcon />}>
                {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                </MenuButton>
                <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem onClick={() => alert('Kagebunshin')}>
                    Create a Copy
                </MenuItem>
                </MenuList>
            </>
            )}
        </Menu>;
    </Flex>
}

export default NavHeader;
