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
  Select,
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
  Spacer,
} from '@chakra-ui/react';
import { createNodeList } from 'nodejs-web-scraper/utils/cheerio';
import { useRef, useState, useReducer } from 'react';
import { add, close } from '../icons/icons';
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
  initRecipeState,
} from '../utils/recipeReducer/actions';
import recipeReducer from '../utils/recipeReducer/reducer';

export function PlanButtons({ date, recipes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        rounded="sm"
        position="absolute"
        bottom="2"
        right="2"
        onClick={onOpen}
      >
        <Icon>{add}</Icon>
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={date} readOnly />
            <Select>
              <option value="breaky">breaky</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
              <option value="dessert">dessert</option>
              <option value="snack">snack</option>
            </Select>
            <Select>
              {recipes.map(recipe => {
                return <option value={recipe._id}>{recipe.name}</option>;
              })}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function RecipeButton({ rand }) {
  const initRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [recipeState, recipeDispatch] = useReducer(
    recipeReducer,
    initRecipeState
  );

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
                      <FormLabel htmlFor="recipe-name">name</FormLabel>
                      <Input
                        name="recipe-name"
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
                      <FormLabel htmlFor="recipe-serves">serves</FormLabel>
                      <NumberInput
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
                      <FormLabel htmlFor="recipe-desc">description</FormLabel>
                      <Input
                        name="recipe-desc"
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
                      <FormLabel htmlFor="recipe-cuisine">cuisine</FormLabel>
                      <Input
                        name="recipe-cuisine"
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
                      <FormLabel htmlFor="recipe-time">
                        cook time (mins)
                      </FormLabel>
                      <NumberInput
                        min={1}
                        allowMouseWheel
                        value={recipeState.cookTime}
                      >
                        <NumberInputField
                          id="amount"
                          name="recipe-time"
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
                      <FormLabel htmlFor="recipe-from">from</FormLabel>
                      <Input
                        name="recipe-from"
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
