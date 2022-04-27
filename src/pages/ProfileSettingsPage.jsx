import { CloseIcon, EditIcon } from "@chakra-ui/icons";
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
  useToast,
  FormControl,
  Input,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { update, deleteuser } from "../features/login-auth/loginauth";
import UserControlHeader from "../components/UserControlHeader";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";
import { getUser } from "../features/login-auth/loginauthservice";
import { useForm } from "react-hook-form";

function ProfileSettingsPage() {
  const store = useStore(loginauthreducer);
  const state = store.getState();

  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModeUsername, setEditModeUsername] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [authUser, setAuthUser] = useState(state.auth.user);
  const [user, setUser] = useState(null);
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await getUser(authUser.username);
      setUser(user);
    };
    getUser();
  }, []);

  store.subscribe(async () => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setAuthUser(store.getState().auth.user);
    const user = await getUser(store.getState().auth.user.username);
    setUser(user);
  });

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    setErrorMessage("");
    const newValues = getValues();

    try {
      const updateUser = await update(user.username, { ...user, ...newValues });
      toast({
        title: "Edit successful!",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setValue("password", "")
      setEditModeEmail(false)
      setEditModePassword(false)
      setEditModeUsername(false)
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    !!isLoggedIn &&
    !!user && (
      <Container bg="gray.100" maxW="container.xl">
        <UserControlHeader />
        <Container padding={5} paddingBottom={10}>
          <Container textAlign="center" backgroundColor="white" padding={5}>
            <Heading>Account</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Divider border="2px" mt={6} mb={6} />
              <Flex>
                <Text fontSize="2xl">Email</Text>
                <Spacer />
                {!editModeEmail && (
                  <Center>
                    <Text>{user.email}</Text>
                    <EditIcon
                      cursor="pointer"
                      ml={5}
                      w={6}
                      h={6}
                      onClick={() => setEditModeEmail(true)}
                    ></EditIcon>
                  </Center>
                )}
                {editModeEmail && (
                  <Box>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                          {...register("email", {
                            required: true,
                            value: user.email,
                          })}
                        />
                      </FormControl>

                      <CloseIcon
                        border="solid 2px"
                        borderRadius={4}
                        p={1}
                        w={6}
                        h={6}
                        cursor="pointer"
                        onClick={() => setEditModeEmail(false)}
                      />
                    </Center>

                    <Button type="submit" colorScheme="purple" isFullWidth>
                      Save edit
                    </Button>
                  </Box>
                )}
              </Flex>

              <Divider border="2px" mt={6} mb={6} />

              <Flex>
                <Text fontSize="2xl">Username</Text>
                <Spacer />
                {!editModeUsername && (
                  <Center>
                    <Text>{user.username}</Text>
                    <EditIcon
                      ml={5}
                      w={6}
                      h={6}
                      cursor="pointer"
                      onClick={() => setEditModeUsername(true)}
                    />
                  </Center>
                )}

                {editModeUsername && (
                  <Box>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                          {...register("username", {
                            required: true,
                            value: user.username,
                          })}
                        />
                      </FormControl>

                      <CloseIcon
                        border="solid 2px"
                        borderRadius={4}
                        p={1}
                        w={6}
                        h={6}
                        cursor="pointer"
                        onClick={() => {
                          setEditModeUsername(false);
                        }}
                      />
                    </Center>

                    <Button type="submit" colorScheme="purple" isFullWidth>
                      Save edit
                    </Button>
                  </Box>
                )}
              </Flex>

              <Divider border="2px" mt={6} mb={6} />

              <Flex>
                <Text fontSize="2xl">Password</Text>
                <Spacer />
                {!editModePassword && (
                  <Center>
                    <Text>{user.password}</Text>
                    <EditIcon
                      cursor="pointer"
                      ml={5}
                      w={6}
                      h={6}
                      onClick={() => setEditModePassword(true)}
                    ></EditIcon>
                  </Center>
                )}
                {editModePassword && (
                  <Box>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                          {...register("password", {
                            required: true,
                            value: user.password,
                          })}
                        />
                      </FormControl>

                      <CloseIcon
                        border="solid 2px"
                        borderRadius={4}
                        p={1}
                        w={6}
                        h={6}
                        cursor="pointer"
                        onClick={() => {
                          setEditModePassword(false);
                        }}
                      />
                    </Center>

                    <Button type="submit" colorScheme="purple" isFullWidth>
                      Save edit
                    </Button>
                  </Box>
                )}
              </Flex>
            </form>

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
                  <Button colorScheme="blue" mr={3} onClick={() => deleteuser(user.username)}>
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
    )
  );
}

export default ProfileSettingsPage;
