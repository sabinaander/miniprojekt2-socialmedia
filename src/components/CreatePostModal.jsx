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
import {  useState } from "react";
import { useStore } from "react-redux";
import PostForm from "../components/PostForm";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";

function CreatePostModal() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    user &&
    <Center padding="0.5rem" gap={{base:"0.5rem", lg: "2rem"}} w="100%" mb={3}>
      <Avatar
        size="xl"
        name={user.username}
        src={user.avatar}
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
