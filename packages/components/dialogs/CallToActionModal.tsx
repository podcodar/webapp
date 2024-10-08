// (Frattezi) FEATURE TEMPORARILY PAUSED: This functionality is currently on hold.
// If you need to restore its usage, please check PR https://github.com/podcodar/webapp/pull/149/.

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Spinner,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { IFRAME_FORM_URL } from "@packages/config/site";
import { useModalActions, useModalStates } from "@packages/features/modal-context";

type ModalVariants = "md" | "full" | "lg" | "xl";

export default function CallToActionModal() {
  const { isOpen } = useModalStates();
  const { close } = useModalActions();
  const [isIframeOpen, setIsIframeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const responsiveModalSize = useBreakpointValue<ModalVariants>({
    base: "full",
    md: "md",
    lg: "xl",
  });

  function handleClose() {
    setIsIframeOpen(false);
    close();
    setIsLoading(true);
  }

  function handleLoad() {
    setIsLoading(!isLoading);
    if (isIframeOpen) handleClose(); // TODO: show a success modal else {
    setIsIframeOpen(true);
  } // TODO: show a success modal

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={responsiveModalSize}>
      <ModalOverlay />

      <ModalContent m={useBreakpointValue({ base: "0", md: "3xl" })}>
        <ModalHeader borderBottom="1px solid" borderColor="whitesmoke">
          Faça Parte
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center" overflow="hidden">
          <Stack>
            {isLoading && (
              <Flex alignItems="center" justifyContent="center" p="10rem 0">
                <Spinner size="lg" m="auto" color="purple.300" />
              </Flex>
            )}

            <GoogleForm handleLoad={handleLoad} isIframeOpen={isIframeOpen} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function GoogleForm({ isIframeOpen = false, handleLoad = () => {} }) {
  const padding = 60;
  const pageWidth = window?.innerWidth ?? 0;
  const pageHeight = window?.innerHeight ?? 0;
  const width = useBreakpointValue({
    base: pageWidth - padding,
    md: isIframeOpen ? 400 : 0,
    lg: isIframeOpen ? 580 : 0,
  });
  const height = useBreakpointValue({
    base: pageHeight - padding,
    md: isIframeOpen ? 480 : 0,
    lg: isIframeOpen ? 600 : 0,
  });
  return (
    <SlideFade in={isIframeOpen} offsetY="1rem">
      <iframe
        title="registration-form"
        src={IFRAME_FORM_URL}
        width={width}
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        onLoad={handleLoad}
      />
    </SlideFade>
  );
}
