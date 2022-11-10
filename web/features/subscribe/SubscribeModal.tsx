import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Subscribe from "./Subscribe";

const SubscribeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="green">
        Subscribe
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Subscribe border="none" borderRadius="lg" onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubscribeModal;
