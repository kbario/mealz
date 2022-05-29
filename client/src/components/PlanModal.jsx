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
  Tag,
  Flex,
  TagLabel,
  TagCloseButton,
  TagRightIcon,
  Divider,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { add, close } from '../icons/icons';
import PlanPopover from '../components/PlanPopover';

export function PlanModal({ date, day, recipes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRecipeIn, setIsRecipeIn] = useState([]);

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
      <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            plan for {day} the {date}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="3">
              <Select>
                <option value="breaky">breaky</option>
                <option value="lunch">lunch</option>
                <option value="dinner">dinner</option>
                <option value="dessert">dessert</option>
                <option value="snack">snack</option>
              </Select>
              <Text>chosen:</Text>
              <Flex wrap="wrap" gap="1">
                {recipes
                  .filter(recipe => isRecipeIn.includes(recipe._id))
                  .map(recipe => {
                    return (
                      <PlanPopover
                        key={recipe._id}
                        backgroundColor="brand.blue"
                        textColor="white"
                        recipe={recipe}
                        isRecipeIn={isRecipeIn}
                        setIsRecipeIn={setIsRecipeIn}
                        isChosen={true}
                      />
                    );
                  })}
              </Flex>
              <Divider />
              <Text>choose from:</Text>
              <Flex wrap="wrap" gap="1">
                {recipes
                  .filter(recipe => !isRecipeIn.includes(recipe._id))
                  .map(recipe => {
                    return (
                      <PlanPopover
                        key={recipe._id}
                        recipe={recipe}
                        isRecipeIn={isRecipeIn}
                        setIsRecipeIn={setIsRecipeIn}
                        isChosen={false}
                      />
                    );
                  })}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PlanModal;
