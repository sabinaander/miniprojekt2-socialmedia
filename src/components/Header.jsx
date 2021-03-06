import {
  Flex,
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
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { logout } from '../features/login-auth/loginauth';
import { useStore } from 'react-redux';
import { useState } from 'react';
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer';

function Header() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);
  let navigate = useNavigate();

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });

  const loginModal = useDisclosure();
  const signupModal = useDisclosure();

  const setLogout = () => {
    logout();
    navigate(`/`);
  };

  return (
    <Container
      maxW="100%"
      borderBottom="1px"
      padding={2}
      borderColor="gray.200"
    >
      <Flex>
        <Center gap={10}>
          <Link to="/">
            <Heading as="h1" size="2xl">
              Socialmblr
            </Heading>
          </Link>
        </Center>

        <Spacer />
        <Center>
          <Flex gap={6}>
            {!isLoggedIn && (
              <Button
                display={{ base: 'block', md: 'none' }}
                onClick={loginModal.onOpen}
              >
                <PersonOutlineIcon fontSize="medium" color="action" />
              </Button>
            )}
            {/* USER IS LOGGED IN */}
            {isLoggedIn ? (
              <>
                <Center>
                  <Text
                    fontSize="lg"
                    mr={2}
                    display={{ base: 'none', md: 'flex' }}
                  >
                    welcome in{' '}
                  </Text>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    display={{ base: 'none', sm: 'flex' }}
                  >
                    {user.username}
                  </Text>
                </Center>
                <Button
                  onClick={setLogout}
                  borderRadius="md"
                  bg="black"
                  color="white"
                  px={4}
                  h={7}
                  _hover={{
                    background: 'gray.600',
                  }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              //  USER IS NOT LOGGED IN
              <>
                <Button
                  borderRadius="md"
                  onClick={loginModal.onOpen}
                  bg="#00A3C4"
                  color="white"
                  px={4}
                  h={8}
                  display={{ base: 'none', md: 'block' }}
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

                <Button
                  as="button"
                  borderRadius="md"
                  onClick={signupModal.onOpen}
                  bg="#00A3C4"
                  color="white"
                  px={4}
                  h={8}
                  display={{ base: 'none', md: 'block' }}
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
                        <SignupForm />
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
              </>
            )}
          </Flex>
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
