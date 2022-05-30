import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Button,
  useDisclosure,
  IconButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { add, close } from '../icons/icons';
import RecipeCard from './RecipeCard';

export function PlanPopover({
  recipe,
  isRecipeIn,
  setIsRecipeIn,
  isChosen,
  serving,
  setServing,
  index,
}) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={true}
      eventListeners={true}
    >
      <PopoverTrigger>
        <Flex>
          <Button
            roundedRight="0"
            backgroundColor={isChosen ? 'brand.green' : 'auto'}
            color={isChosen ? 'white' : 'auto'}
          >
            {recipe.name}
          </Button>
          <IconButton
            roundedLeft="0"
            onClick={
              isChosen
                ? () => {
                    setIsRecipeIn(isRecipeIn.filter(id => id !== recipe._id));
                    setServing(serving.filter((id, idx) => idx !== index));
                  }
                : () => {
                    setIsRecipeIn([...isRecipeIn, recipe._id]);
                  }
            }
            icon={isChosen ? close : add}
            backgroundColor={isChosen ? 'brand.green' : 'auto'}
            fill={isChosen ? 'white' : 'auto'}
          />
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody display="flex" flexDirection="column" gap="2">
          <RecipeCard recipe={recipe} />
          {isChosen && (
            <FormControl>
              <FormLabel htmlFor="serving">for how many?</FormLabel>
              <NumberInput min={1} allowMouseWheel value={serving[index]}>
                <NumberInputField
                  id="serving"
                  name="serving"
                  onChange={e => {
                    const serves = serving;
                    serves[index] = parseInt(e.target.value);
                    setServing([...serves]);
                  }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PlanPopover;
