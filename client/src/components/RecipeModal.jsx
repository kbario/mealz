import { useRef, useReducer } from 'react';
import { useMutation } from '@apollo/client';

import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

import { ADD_RECIPE } from '../utils/mutations';

import recipeReducer from '../utils/recipeReducer/reducer';

import {
  SET_RECIPE_TO_ZERO,
  initRecipeState,
} from '../utils/recipeReducer/actions';

import { add } from '../icons/icons';
import MetaTab from './recipeModalTabs/MetaTab';
import IngreedsTab from './recipeModalTabs/IngreedsTab';
import InstructsTab from './recipeModalTabs/InstructsTab';

const tabNames = ['meta', 'ingreeds', 'instructs'];

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
      await addRecipe({
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
                {tabNames.map((tab, idx) => {
                  return <Tab key={idx}>{tab}</Tab>;
                })}
              </TabList>
              <TabPanels>
                <TabPanel id="meta">
                  <MetaTab
                    recipeState={recipeState}
                    initRef={initRef}
                    recipeDispatch={recipeDispatch}
                  />
                </TabPanel>
                <TabPanel id="ingreeds">
                  <IngreedsTab
                    isNotPhone={isNotPhone}
                    recipeState={recipeState}
                    recipeDispatch={recipeDispatch}
                    rand={rand}
                  />
                </TabPanel>
                <TabPanel id="instructions">
                  <InstructsTab
                    recipeState={recipeState}
                    recipeDispatch={recipeDispatch}
                    rand={rand}
                  />
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
