import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  VStack,
  Flex,
  SlideFade,
} from '@chakra-ui/react';
import {
  useModalActions,
  useModalStates,
} from '@packages/features/modal-context';
import React, { useState } from 'react';

function CallToActionModal() {
  const { isOpen } = useModalStates();
  const { close } = useModalActions();
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleClose() {
    setIsIframeOpen(false);
    close();
    setIsLoading(true);
  }

  function handleLoad() {
    setIsLoading(!isLoading);
    if (!isIframeOpen) {
      setIsIframeOpen(true);
    } else handleClose(); // TODO: show a success modal
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />

      <ModalContent>
        <ModalHeader borderBottom="1px solid" borderColor="whitesmoke">
          Faça Parte
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          maxH={{ base: '100%', md: '500' }}
          d="flex"
          justifyContent="center"
          overflow="hidden"
        >
          <VStack>
            {isLoading && (
              <Flex alignItems="center" justifyContent="center" p="30% 0">
                <Spinner size="lg" m="auto" color="purple.300" />
              </Flex>
            )}
            <SlideFade in={isIframeOpen} offsetY="1rem">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSeoy7Jg_LaXsJMDYJ1gXKBRPu4tIdQiPBG5ZmLennVKSb_GVg/viewform?embedded=true"
                width="400"
                height="480"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                onLoad={handleLoad}
              />
            </SlideFade>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CallToActionModal;
