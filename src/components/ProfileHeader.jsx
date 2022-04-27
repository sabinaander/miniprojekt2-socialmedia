import {
  Box,
  Button,
  Avatar,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  useToast,
  FormControl,
  Input,
  Center,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { update } from "../features/login-auth/loginauth";

function ProfileHeader(props) {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");

  const backgroundDisclosure = useDisclosure();
  const avatarDisclosure = useDisclosure();

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
      const updateUser = await update(props.profileUser.username, {
        ...props.profileUser,
        ...newValues,
      });
      toast({
        title: "Edit successful!",
        description: "",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      avatarDisclosure.onClose()
      backgroundDisclosure.onClose()

      props.loadUser(props.profileUser.username);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    props.profileUser && (
      <Box maxW="100%">
        <form id="bioForm" onSubmit={handleSubmit(onSubmit)}>
          <Box height="30vh" position="relative">
            <Box
              position="absolute"
              width="100%"
              backgroundColor="gray"
              height="100%"
              left="0"
              role="group"
              backgroundImage={props.profileUser.backgroundimage}
              backgroundSize="cover"
            >
              {!!props.isLoggedIn &&
                props.profileUser.username === props.authUser.username && (
                  <EditIcon
                    d="none"
                    _groupHover={{ display: "inline" }}
                    color="white"
                    float="right"
                    cursor="pointer"
                    ml={5}
                    w={6}
                    h={6}
                    onClick={backgroundDisclosure.onOpen}
                  ></EditIcon>
                )}
            </Box>

              <Modal
                closeOnOverlayClick={false}
                isOpen={backgroundDisclosure.isOpen}
                onClose={backgroundDisclosure.onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit background image</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                          {...register("backgroundimage", {
                            required: true,
                            value: props.profileUser.backgroundimage,
                          })}
                        />
                      </FormControl>
                    </Center>

                    <Button
                      form="bioForm"
                      type="submit"
                      colorScheme="purple"
                      isFullWidth
                    >
                      Save edit
                    </Button>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={backgroundDisclosure.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
           
            <Box position="relative" w="min-content" padding={3}>
              <Box position="relative" role="group" w="min-content">
                <Avatar
                  size="xl"
                  name={props.profileUser.username}
                  src={props.profileUser.avatar}
                />
                {!!props.isLoggedIn &&
                  props.profileUser.username === props.authUser.username && (
                    <EditIcon
                      d="none"
                      _groupHover={{ display: "inline" }}
                      position="absolute"
                      left="40%"
                      color="white"
                      cursor="pointer"
                      ml={5}
                      w={6}
                      h={6}
                      onClick={avatarDisclosure.onOpen}
                    ></EditIcon>
                  )}
              </Box>
              <Heading as="h1" size="2xl" color="white">
                {props.profileUser.username}
              </Heading>
            </Box>
              <Modal
                closeOnOverlayClick={false}
                isOpen={avatarDisclosure.isOpen}
                onClose={avatarDisclosure.onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit avatar picture</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                          {...register("avatar", {
                            required: true,
                            value: props.profileUser.avatar,
                          })}
                        />
                      </FormControl>
                    </Center>

                    <Button
                      form="bioForm"
                      type="submit"
                      colorScheme="purple"
                      isFullWidth
                    >
                      Save edit
                    </Button>
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={avatarDisclosure.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            
            <Flex>
              <Spacer />
            </Flex>
          </Box>
        </form>
      </Box>
    )
  );
}

export default ProfileHeader;
