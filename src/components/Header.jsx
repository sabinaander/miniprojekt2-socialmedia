import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Center,
  Heading,
  Spacer,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
  color
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Header() {
  const loginModal = useDisclosure();
  const signupModal = useDisclosure();

  return (
    <Container maxW="100%" border="1px" padding={2} borderColor="gray.200">
      <Flex>
        <Center gap={10}>
          <Link to="/">
            <Heading as="h1" size="2xl">
              Socialmblr
            </Heading>
          </Link>

          <InputGroup display={{ base: "none", md: "block" }}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input placeholder="Search for posts..." />
          </InputGroup>
        </Center>

        <Spacer />
        <Center>
          <Flex gap={6}>
            <Button display={{ base: "block", md: "none" }} onClick={loginModal.onOpen}>
              <PersonOutlineIcon fontSize="medium" color="action" />
            </Button>

            {/* LOG IN MODAL */}
            <Button
              borderRadius="md"
              onClick={loginModal.onOpen}
              bg="#00A3C4"
              color="white"
              px={4}
              h={8}
              display={{ base: "none", md: "block" }}
            >
              Log In
              <Modal
                closeOnOverlayClick={false}
                isOpen={loginModal.isOpen}
                onClose={loginModal.onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Log in </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <LoginForm />
                  </ModalBody>
                  <ModalFooter gap="1rem">
                  <Text
                    cursor="pointer"
                      onClick={() => {
                        loginModal.onClose();
                        signupModal.onOpen();
                      }}
                    >
                      Signup
                    </Text>
                    <Button onClick={loginModal.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Button>

            {/* SIGNUP MODAL */}
            <Button
              as="button"
              borderRadius="md"
              onClick={signupModal.onOpen}
              bg="#00A3C4"
              color="white"
              px={4}
              h={8}
              display={{ base: "none", md: "block" }}
            >
              Signup
              <Modal
                closeOnOverlayClick={false}
                isOpen={signupModal.isOpen}
                onClose={signupModal.onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Sign up</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <SignupForm/>
                  </ModalBody>
                  <ModalFooter gap="1rem">
                    <Text
                    cursor="pointer"
                      onClick={() => {
                        signupModal.onClose();
                        loginModal.onOpen();
                      }}
                    >
                      Log in
                    </Text>
                    <Button onClick={signupModal.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Button>
          </Flex>
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
