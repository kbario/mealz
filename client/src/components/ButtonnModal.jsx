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
} from '@chakra-ui/react';
import { add } from '../icons/icons';

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
                return (
                  <option key={recipe._id} value={recipe._id}>
                    {recipe.name}
                  </option>
                );
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
