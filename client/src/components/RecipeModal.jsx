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

import { initRecipeState } from '../utils/recipeReducer/actions';
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
  SET_RECIPE_TO_ZERO,
} from '../utils/recipeReducer/actions';

import { add, close } from '../icons/icons';

function RecipeModal({ rand }) {
  const initRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addRecipe, { recipeLoading, recipeError }] = useMutation(ADD_RECIPE);

  const [recipeState, recipeDispatch] = useReducer(
    recipeReducer,
    initRecipeState
  );

  async function handleAddRecipe(e) {
    e.preventDefault();

    const { name, description, serves, ingredients, from, cuisine, cookTime } =
      recipeState;

    if (!name || !serves || !ingredients) return;

    try {
      const { data } = await addRecipe({
        variables: {
          name,
          serves,
          ingredients,
          description: description ? description : null,
          from: from ? from : null,
          cuisine: cuisine ? cuisine : null,
          cookTime: cookTime ? cookTime : null,
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
        rounded="sm"
        position="absolute"
        bottom="5"
        right="5"
        onClick={onOpen}
      >
        <Icon viewBox="0 0 24 24">{add}</Icon>
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="scale"
        initialFocusRef={initRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>add a recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="line" isFitted minH="lg">
              <TabList>
                <Tab _focus="none">info</Tab>
                <Tab _focus="none">ingredients</Tab>
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
                </TabPanel>
                <TabPanel id="ingreeds">
                  <Flex direction="column">
                    <Flex>
                      <Text w="4rem" textAlign="center" p="0" m="0">
                        amount
                      </Text>
                      <Text w="4rem" textAlign="center" p="0" m="0">
                        units
                      </Text>
                      <Text flexGrow="1" textAlign="center" p="0" m="0">
                        ingredients
                      </Text>
                      <Box w="40px"></Box>
                    </Flex>
                    <Flex direction="column" gap="1">
                      {recipeState.ingredients.length > 1 ? (
                        recipeState.ingredients.map((ingreed, idx) => {
                          return (
                            <Flex key={idx}>
                              <Input
                                type="number"
                                name="amount"
                                w="8rem"
                                roundedRight="0"
                                value={ingreed.a}
                                onChange={e => {
                                  recipeDispatch({
                                    type: UPDATE_INGREDIENT_AMOUNT,
                                    payload: {
                                      value: e.target.value,
                                      idx: idx,
                                    },
                                  });
                                }}
                                p="0"
                                m="0"
                              />
                              <Input
                                name="unit"
                                w="8rem"
                                rounded="0"
                                value={ingreed.u}
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
                                name="ingredient"
                                flexGrow="1"
                                rounded="0"
                                value={ingreed.i}
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
                            type="number"
                            name="amount"
                            w="20%"
                            roundedRight="0"
                            placeholder={rand.a}
                            value={recipeState.ingredients[0].a}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INGREDIENT_AMOUNT,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Input
                            name="unit"
                            w="25%"
                            rounded="0"
                            placeholder={rand.u}
                            value={recipeState.ingredients[0].u}
                            onChange={e =>
                              recipeDispatch({
                                type: UPDATE_INGREDIENT_UNIT,
                                payload: { value: e.target.value, idx: 0 },
                              })
                            }
                          />
                          <Input
                            name="ingredient"
                            w="50%"
                            rounded="0"
                            placeholder={rand.i}
                            value={recipeState.ingredients[0].i}
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
                              !recipeState.ingredients[0].a &&
                              !recipeState.ingredients[0].u &&
                              !recipeState.ingredients[0].i
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
                  <Button
                    onClick={e => {
                      recipeDispatch({ type: ADD_INGREDIENT_INPUT });
                    }}
                    boxSize="20"
                  >
                    {add}
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            {recipeError && <div>{recipeError}</div>}
            {recipeLoading && <div>Loading...</div>}
            <Button onClick={e => handleAddRecipe(e)}>save</Button>
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
