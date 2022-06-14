import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
} from '@chakra-ui/react';

import {
  UPDATE_RECIPE_NAME,
  UPDATE_RECIPE_DESCRIPTION,
  UPDATE_RECIPE_SERVES,
  UPDATE_RECIPE_CUISINE,
  UPDATE_RECIPE_COOKTIME,
  UPDATE_RECIPE_FROM,
} from '../../utils/recipeReducer/actions';

function MetaTab({ recipeState, initRef, recipeDispatch }) {
  return (
    <Flex direction="column" gap="6">
      <FormControl isRequired>
        <FormLabel htmlFor="recipeName">name</FormLabel>
        <Input
          name="recipeName"
          ref={initRef}
          value={recipeState.name}
          onChange={e => {
            recipeDispatch({
              type: UPDATE_RECIPE_NAME,
              payload: e.target.value,
            });
          }}
        />
      </FormControl>
      <Flex gap="6">
        <FormControl isRequired>
          <FormLabel htmlFor="recipeServes">serves</FormLabel>
          <NumberInput
            name="recipeServes"
            min={1}
            allowMouseWheel
            value={recipeState.serves}
          >
            <NumberInputField
              id="amount"
              value={recipeState.serves}
              onChange={e => {
                recipeDispatch({
                  type: UPDATE_RECIPE_SERVES,
                  payload: e.target.value,
                });
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="recipeTime">cook time (mins)</FormLabel>
          <NumberInput min={1} allowMouseWheel value={recipeState.cookTime}>
            <NumberInputField
              id="amount"
              name="recipeTime"
              value={recipeState.cookTime}
              onChange={e => {
                recipeDispatch({
                  type: UPDATE_RECIPE_COOKTIME,
                  payload: e.target.value,
                });
              }}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel htmlFor="recipeDesc">description</FormLabel>
        <Input
          name="recipeDesc"
          value={recipeState.description}
          onChange={e => {
            recipeDispatch({
              type: UPDATE_RECIPE_DESCRIPTION,
              payload: e.target.value,
            });
          }}
        />
      </FormControl>
      <Flex gap="5">
        <FormControl>
          <FormLabel htmlFor="recipeCuisine">cuisine</FormLabel>
          <Input
            name="recipeCuisine"
            value={recipeState.cuisine}
            onChange={e => {
              recipeDispatch({
                type: UPDATE_RECIPE_CUISINE,
                payload: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="recipeFrom">from</FormLabel>
          <Input
            name="recipeFrom"
            value={recipeState.from}
            onChange={e => {
              recipeDispatch({
                type: UPDATE_RECIPE_FROM,
                payload: e.target.value,
              });
            }}
          />
          <FormHelperText>
            nana's recipe? from a website? put it down
          </FormHelperText>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default MetaTab;
