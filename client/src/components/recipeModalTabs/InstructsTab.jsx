import { Button, Input, Flex } from '@chakra-ui/react';
import { randomInstructions } from '../../utils/randomPlaceholders';
import {
  ADD_INSTRUCTION_INPUT,
  UPDATE_INSTRUCTION,
  REMOVE_INSTRUCTION,
  SET_INSTRUCTION_TO_ZERO,
} from '../../utils/recipeReducer/actions';

import { add, close } from '../../icons/icons';
function InstructsTab({ recipeState, recipeDispatch, rand }) {
  return (
    <>
      <Flex direction="column" maxH="64" overflow={'auto'} p="1">
        <Flex direction="column" gap="6">
          {recipeState.instructions.map((instruct, idx, arr) => {
            return (
              <Flex key={idx}>
                <Input
                  p={2}
                  name="amount"
                  flexGrow="1"
                  roundedRight="0"
                  placeholder={idx === 0 ? randomInstructions[rand] : ''}
                  value={instruct}
                  onChange={e => {
                    recipeDispatch({
                      type: UPDATE_INSTRUCTION,
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
                          ? SET_INSTRUCTION_TO_ZERO
                          : REMOVE_INSTRUCTION,
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
          onClick={() => {
            recipeDispatch({ type: ADD_INSTRUCTION_INPUT });
          }}
          boxSize="12"
          p="0"
          rounded="full"
          isDisabled={
            recipeState.instructions[recipeState.instructions.length - 1] === ''
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

export default InstructsTab;
