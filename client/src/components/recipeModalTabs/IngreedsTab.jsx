import { Flex, Text, Box, Input, Button } from '@chakra-ui/react';
import { add, close } from '../../icons/icons';
import { randomIngreeds } from '../../utils/randomPlaceholders';
import {
  ADD_INGREDIENT_INPUT,
  UPDATE_INGREDIENT_AMOUNT,
  UPDATE_INGREDIENT_UNIT,
  UPDATE_INGREDIENT_NAME,
  REMOVE_INGREDIENT,
  SET_INGREDIENT_TO_ZERO,
} from '../../utils/recipeReducer/actions';

function IngreedsTab({ isNotPhone, recipeState, recipeDispatch, rand }) {
  return (
    <>
      <Flex direction="column">
        <Flex>
          <Text maxW="4rem" w="20%" textAlign="center" p="0" m="0">
            {isNotPhone ? 'amount' : 'amnt'}
          </Text>
          <Text maxW="4rem" w="20%" textAlign="center" p="0" m="0">
            units
          </Text>
          <Text flexGrow="1" textAlign="center" p="0" m="0">
            ingredients
          </Text>
          <Box w="40px"></Box>
        </Flex>
        <Flex direction="column" gap="1" maxH="64" p="1" overflow={'auto'}>
          {recipeState.ingredients.map((ingreed, idx, arr) => {
            return (
              <Flex key={idx}>
                <Input
                  p={2}
                  type="number"
                  name="amount"
                  maxW="8rem"
                  w="25%"
                  minW="3rem"
                  roundedRight="0"
                  placeholder={idx === 0 ? randomIngreeds[rand].a : ''}
                  value={ingreed.amount}
                  onChange={e => {
                    recipeDispatch({
                      type: UPDATE_INGREDIENT_AMOUNT,
                      payload: {
                        value: e.target.value,
                        idx: idx,
                      },
                    });
                  }}
                />
                <Input
                  p={2}
                  name="unit"
                  maxW="8rem"
                  w="25%"
                  minW="3rem"
                  rounded="0"
                  placeholder={idx === 0 ? randomIngreeds[rand].u : ''}
                  value={ingreed.unit}
                  onChange={e => {
                    recipeDispatch({
                      type: UPDATE_INGREDIENT_UNIT,
                      payload: {
                        value: e.target.value,
                        idx: idx,
                      },
                    });
                  }}
                />
                <Input
                  p={2}
                  name="ingredient"
                  flexGrow="1"
                  rounded="0"
                  placeholder={idx === 0 ? randomIngreeds[rand].i : ''}
                  value={ingreed.name}
                  onChange={e => {
                    recipeDispatch({
                      type: UPDATE_INGREDIENT_NAME,
                      payload: {
                        value: e.target.value,
                        idx: idx,
                      },
                    });
                  }}
                />
                <Button
                  w="40px"
                  p="0"
                  roundedLeft="0"
                  onClick={e => {
                    recipeDispatch({
                      type:
                        arr.length === 1
                          ? SET_INGREDIENT_TO_ZERO
                          : REMOVE_INGREDIENT,
                      payload: idx,
                    });
                  }}
                >
                  {close}
                </Button>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex w="full" p="5" justifyContent="center">
        <Button
          onClick={e => {
            recipeDispatch({ type: ADD_INGREDIENT_INPUT });
          }}
          boxSize="12"
          p="0"
          rounded="full"
          isDisabled={
            recipeState.ingredients[recipeState.ingredients.length - 1].name ===
              '' ||
            recipeState.ingredients[recipeState.ingredients.length - 1].unit ===
              '' ||
            recipeState.ingredients[recipeState.ingredients.length - 1]
              .amount === ''
              ? true
              : false
          }
        >
          {add}
        </Button>
      </Flex>
    </>
  );
}

export default IngreedsTab;
