import { EditIcon } from "@chakra-ui/icons";
import {
  Divider,
  Container,
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserControlHeader from "../components/UserControlHeader";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";

function ProfileSettingsPage() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateEmail = () => {
    // update db and localstorage
  };

  const updateUsername = () => {
    // update db and localstorage
  };

  const updatePassword = () => {
    // update db and localstorage
  };

  const deleteAccount = () => {
    // remove from db
    navigate(`/`);
  };

  return (
    <Container bg="gray.100" maxW="container.xl">
      <UserControlHeader />
      <Container padding={5} paddingBottom={10}>
        <Container textAlign="center" backgroundColor="white" padding={5}>
          <Heading>Account</Heading>
          <Divider border="2px" mt={6} mb={6} />
          <Flex>
            <Text fontSize="2xl">Email</Text>
            <Spacer />
            <Text>{user.email}</Text>
            <EditIcon ml={5} w={6} h={6} onClick={{}}>
            </EditIcon>
          </Flex>

          <Divider border="2px" mt={6} mb={6} />

          <Flex>
            <Text fontSize="2xl">Username</Text>
            <Spacer />
            <Text>{user.username}</Text>
            <EditIcon ml={5} w={6} h={6} onClick={{}}></EditIcon>
          </Flex>

          <Divider border="2px" mt={6} mb={6} />

          <Flex>
            <Text fontSize="2xl">Password</Text>
            <Spacer />
            <Text>{user.password}</Text>
            <EditIcon ml={5} w={6} h={6} onClick={{}}></EditIcon>
          </Flex>

          <Divider border="2px" mt={6} mb={6} />

          <Button
            variant="outline"
            border="2px"
            borderColor="gray.500"
            onClick={onOpen}
          >
            Delete account
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Are you sure? This can't be reversed.</ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={deleteAccount}>
                  DELETE
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Container>
    </Container>
  );
}

export default ProfileSettingsPage;
