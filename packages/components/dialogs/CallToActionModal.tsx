import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {
  useModalActions,
  useModalStates,
} from '@packages/features/modal-context';

function CallToActionModal() {
  const { isOpen } = useModalStates();
  const { close } = useModalActions();
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Modal Body</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CallToActionModal;
