import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
  Button,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { add, close } from '../icons/icons';
import RecipeCard from './RecipeCard';

export function PlanPopover({ recipe, isRecipeIn, setIsRecipeIn, isChosen }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Flex>
          <Button roundedRight="0" _focus="none">
            {recipe.name}
          </Button>
          <IconButton
            roundedLeft="0"
            onClick={
              isChosen
                ? () => {
                    setIsRecipeIn(isRecipeIn.filter(id => id !== recipe._id));
                  }
                : () => {
                    setIsRecipeIn([...isRecipeIn, recipe._id]);
                  }
            }
            icon={isChosen ? close : add}
            _focus="none"
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <RecipeCard recipe={recipe} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PlanPopover;
