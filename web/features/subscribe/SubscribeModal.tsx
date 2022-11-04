import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import Subscribe from "./Subscribe";

const SubscribeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} variant="outline" colorScheme="green">
        Subscribe
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Subscribe />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubscribeModal;
