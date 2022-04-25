import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Center,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import PostForm from "../components/PostForm";

function CreatePostModal() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Center padding="0.5rem" gap={{base:"0.5rem", lg: "2rem"}} w="100%" mb={3}>
      <Avatar
        size="xl"
        name={currentUser?.username}
        src={currentUser?.avatar}
      />
      <Button
        onClick={onOpen}
        colorScheme="teal"
        w={{ base: "8rem", md: "12rem", lg: "15rem" }}
      >
        Create A Post
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write something..</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PostForm />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}

export default CreatePostModal;
