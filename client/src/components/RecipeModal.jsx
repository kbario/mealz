import { useRef, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import {
  Button,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  Input,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Flex,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
} from '@chakra-ui/react';

import { ADD_RECIPE } from '../utils/mutations';

import {} from '../utils/recipeReducer/actions';
import recipeReducer from '../utils/recipeReducer/reducer';

import {
  UPDATE_RECIPE_NAME,
  UPDATE_RECIPE_DESCRIPTION,
  UPDATE_RECIPE_SERVES,
  UPDATE_RECIPE_CUISINE,
  UPDATE_RECIPE_COOKTIME,
  UPDATE_RECIPE_FROM,
  ADD_INGREDIENT_INPUT,
  UPDATE_INGREDIENT_AMOUNT,
  UPDATE_INGREDIENT_UNIT,
  UPDATE_INGREDIENT_NAME,
  REMOVE_INGREDIENT,
  SET_INGREDIENT_TO_ZERO,
  ADD_INSTRUCTION_INPUT,
  UPDATE_INSTRUCTION,
  REMOVE_INSTRUCTION,
  SET_INSTRUCTION_TO_ZERO,
  SET_RECIPE_TO_ZERO,
  initRecipeState,
} from '../utils/recipeReducer/actions';

import {
  randomIngreeds,
  randomInstructions,
} from '../utils/randomPlaceholders';

import { add, close } from '../icons/icons';

function RecipeModal({ rand, isNotPhone }) {
  const initRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addRecipe, { loading, error }] = useMutation(ADD_RECIPE);

  const [recipeState, recipeDispatch] = useReducer(
    recipeReducer,
    initRecipeState
  );

  async function handleAddRecipe(e) {
    e.preventDefault();

    const {
      name,
      description,
      serves,
      ingredients,
      instructions,
      from,
      cuisine,
      cookTime,
    } = recipeState;

    if (!name || !serves || !ingredients) return;

    try {
      // console.log(recipeState);
      const { data } = await addRecipe({
        variables: {
          name,
          serves: parseInt(serves),
          ingredients,
          instructions,
          description: description ? description : null,
          from: from ? from : null,
          cuisine: cuisine ? cuisine : null,
          cookTime: cookTime ? parseInt(cookTime) : null,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button
        rounded="full"
        position="absolute"
        bottom="5"
        right="5"
        boxSize="12"
        p="0"
        onClick={onOpen}
      >
        {add}
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="scale"
        initialFocusRef={initRef}
        m="5"
        size={isNotPhone ? 'lg' : 'xs'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add a recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="line" isFitted minH="md">
              <TabList>
                <Tab _focus="none">meta</Tab>
                <Tab _focus="none">ingreeds</Tab>
                <Tab _focus="none">instructs</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Flex direction="column" gap="3">
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
                    <Flex gap="5">
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
                        <FormLabel htmlFor="recipeTime">
                          cook time (mins)
                        </FormLabel>
                        <NumberInput
                          min={1}
                          allowMouseWheel
                          value={recipeState.cookTime}
                        >
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
                </TabPanel>
                <TabPanel id="ingreeds">
                  <Flex direction="column">
                    <Flex>
                      <Text maxW="5rem" w="20%" textAlign="center" p="0" m="0">
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
                    <Flex
                      direction="column"
                      gap="1"
                      maxH="64"
                      p="1"
                      overflow={'auto'}
                    >
                      {recipeState.ingredients.length > 1 ? (
                        recipeState.ingredients.map((ingreed, idx) => {
                          return (
                            <Flex key={idx}>
                              <Input
                                p={2}
                                type="number"
                                name="amount"
                                maxW="8rem"
                                w="20%"
                                minW="3rem"
                                roundedRight="0"
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
                                w="20%"
                                minW="3rem"
                                rounded="0"
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
                                    type: REMOVE_INGREDIENT,
                                    payload: idx,
                                  });
                                }}
                              >
                                {close}
                              </Button>
                            </Flex>
                          );
                        })
                      ) : (
                        <Flex>
                          <Input
                            p={2}
                            type="number"
                            name="amount"
                            w="20%"
                            roundedRight="0"
                            placeholder={randomIngreeds[rand].a}
                            value={recipeState.ingredients[0].amount}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INGREDIENT_AMOUNT,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Input
                            p={2}
                            name="unit"
                            w="25%"
                            rounded="0"
                            placeholder={randomIngreeds[rand].u}
                            value={recipeState.ingredients[0].unit}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INGREDIENT_UNIT,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Input
                            p={2}
                            name="ingredient"
                            w="50%"
                            rounded="0"
                            placeholder={randomIngreeds[rand].i}
                            value={recipeState.ingredients[0].name}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INGREDIENT_NAME,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Button
                            w="5%"
                            p="0"
                            roundedLeft="0"
                            onClick={e =>
                              recipeDispatch({
                                type: SET_INGREDIENT_TO_ZERO,
                              })
                            }
                            isDisabled={
                              !recipeState.ingredients[0].amount &&
                              !recipeState.ingredients[0].unit &&
                              !recipeState.ingredients[0].name
                                ? true
                                : false
                            }
                          >
                            {close}
                          </Button>
                        </Flex>
                      )}
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
                    >
                      {add}
                    </Button>
                  </Flex>
                </TabPanel>
                <TabPanel id="instructions">
                  <Flex direction="column" maxH="64" overflow={'auto'} p="1">
                    <Flex direction="column" gap="1">
                      {recipeState.instructions.length > 1 ? (
                        recipeState.instructions.map((instruct, idx) => {
                          return (
                            <Flex key={idx}>
                              <Input
                                p={2}
                                name="amount"
                                flexGrow="1"
                                roundedRight="0"
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
                                    type: REMOVE_INSTRUCTION,
                                    payload: idx,
                                  });
                                }}
                              >
                                {close}
                              </Button>
                            </Flex>
                          );
                        })
                      ) : (
                        <Flex>
                          <Input
                            p={2}
                            name="ingredient"
                            rounded="0"
                            flexGrow="1"
                            placeholder={randomInstructions[rand]}
                            value={recipeState.instructions[0].instruct}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INSTRUCTION,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Button
                            w="40px"
                            p="0"
                            roundedLeft="0"
                            onClick={e =>
                              recipeDispatch({
                                type: SET_INSTRUCTION_TO_ZERO,
                              })
                            }
                            isDisabled={
                              !recipeState.instructions[0] ? true : false
                            }
                          >
                            {close}
                          </Button>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                  <Flex w="full" p="5" justifyContent="center">
                    <Button
                      onClick={e => {
                        recipeDispatch({ type: ADD_INSTRUCTION_INPUT });
                      }}
                      boxSize="12"
                      p="0"
                      rounded="full"
                    >
                      {add}
                    </Button>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            {error && <div>{error.message}</div>}
            {loading && <div>Loading...</div>}
            <Button
              onClick={e => handleAddRecipe(e)}
              isDisabled={
                !recipeState.ingredients[0].name ||
                !recipeState.ingredients[0].amount ||
                !recipeState.ingredients[0].unit ||
                !recipeState.instructions[0] ||
                !recipeState.name ||
                !recipeState.serves
              }
            >
              save
            </Button>
            <Button
              onClick={() => recipeDispatch({ type: SET_RECIPE_TO_ZERO })}
            >
              reset
            </Button>
            <Button onClick={onClose}>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
