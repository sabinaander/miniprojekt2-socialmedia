import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  Center,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import PostForm from "../components/PostForm";

function CreatePostModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    
      <Center padding="0.5rem" gap="2rem" w="100%" mb={3}>
        <Avatar
          size="xl"
          name="America, fuck yeaa!"
          src="https://static.feber.se/article_images/50/72/03/507203_1280.jpg"
        />{" "}
        <Button onClick={onOpen} colorScheme="teal" w="15rem">
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
