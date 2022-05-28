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
} from '@chakra-ui/react';
import { useState } from 'react';
import { add, close } from '../icons/icons';

export function PlanButtons({ date, day, recipes }) {
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
              <Flex wrap="wrap" gap="1">
                {recipes
                  .filter(recipe => isRecipeIn.includes(recipe._id))
                  .map(recipe => {
                    return (
                      <Tag
                        key={recipe._id}
                        value={recipe._id}
                        size="lg"
                        backgroundColor="brand.blue"
                        textColor="white"
                      >
                        <TagLabel>{recipe.name}</TagLabel>
                        <TagCloseButton
                          onClick={() => {
                            setIsRecipeIn(
                              isRecipeIn.filter(id => id !== recipe._id)
                            );
                          }}
                        />
                      </Tag>
                    );
                  })}
              </Flex>
              <Flex wrap="wrap" gap="1">
                {recipes
                  .filter(recipe => !isRecipeIn.includes(recipe._id))
                  .map(recipe => {
                    return (
                      <Tag key={recipe._id} value={recipe._id} size="lg">
                        <TagLabel>{recipe.name}</TagLabel>

                        <TagRightIcon
                          _hover={{ cursor: 'pointer', background: 'grey' }}
                          viewBox="0 0 48 48 "
                          rounded="full"
                          onClick={() => {
                            setIsRecipeIn([...isRecipeIn, recipe._id]);
                          }}
                        >
                          {add}
                        </TagRightIcon>
                      </Tag>
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
