import {
  Button,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  Select,
  ModalFooter,
  ModalCloseButton,
  Flex,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { add, close } from '../icons/icons';
import PlanPopover from '../components/PlanPopover';
import { ADD_CARD } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export function PlanModal({ date, day, recipes, isPhone }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRecipeIn, setIsRecipeIn] = useState([]);
  const [mealName, setMealName] = useState('breaky');
  const [serving, setServing] = useState([]);
  const [addCard, { loading, error }] = useMutation(ADD_CARD);

  async function handleSave(e, date) {
    e.preventDefault();
    if (
      !(isRecipeIn instanceof Array) ||
      isRecipeIn.length === 0 ||
      mealName === ''
    )
      return;

    try {
      // console.log(recipeState);
      const { data } = await addCard({
        variables: {
          name: mealName,
          date,
          serving: serving,
          meals: isRecipeIn,
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
        position="absolute"
        bottom="2"
        right="2"
        boxSize="12"
        p="0"
        rounded="full"
        onClick={onOpen}
      >
        {add}
      </Button>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="scale"
        size={isPhone ? 'xs' : 'lg'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            plan for {day} the {date}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="3">
              <Select onChange={e => setMealName(e.target.value)}>
                <option value="breaky">breaky</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
                <option value="dessert">dessert</option>
                <option value="snack">snack</option>
              </Select>
              <Text>chosen:</Text>
              <Flex wrap="wrap" gap="1" maxH="40" overflow={'auto'}>
                {recipes
                  .filter(recipe => isRecipeIn.includes(recipe._id))
                  .map((recipe, idx) => {
                    return (
                      <PlanPopover
                        key={recipe._id}
                        backgroundColor="brand.blue"
                        textColor="white"
                        recipe={recipe}
                        isRecipeIn={isRecipeIn}
                        setIsRecipeIn={setIsRecipeIn}
                        isChosen={true}
                        serving={serving}
                        setServing={setServing}
                        index={idx}
                      />
                    );
                  })}
              </Flex>
              <Divider />
              <Text>choose from:</Text>
              <Flex wrap="wrap" gap="1" maxH="40" overflow={'auto'}>
                {recipes
                  .filter(recipe => !isRecipeIn.includes(recipe._id))
                  .map((recipe, idx) => {
                    return (
                      <PlanPopover
                        key={recipe._id}
                        recipe={recipe}
                        isRecipeIn={isRecipeIn}
                        setIsRecipeIn={setIsRecipeIn}
                        isChosen={false}
                        serving={serving}
                        index={idx}
                      />
                    );
                  })}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={e => handleSave(e, date)}>save</Button>
            <Button onClick={() => setIsRecipeIn([])}>reset</Button>
            <Button onClick={onClose}>close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PlanModal;
