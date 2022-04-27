import {
  Container,
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
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { update } from "../features/login-auth/loginauth";

function ProfileHeader(props) {
  const [EditModeBackGroundImage, setEditModeBackGroundImage] = useState(false);
  const [editModeAvatar, setEditModeAvatar] = useState(false);

  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");

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
      setEditModeAvatar(false);
      setEditModeBackGroundImage(false);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    props.profileUser && (
      <Container maxW="100%" padding={0}>
        <Container
            maxW="100%"
            height="30vh"
            padding={2}
            backgroundImage={props.profileUser.backgroundimage}
          >
        <form onSubmit={handleSubmit(onSubmit)}>
            {!!props.isLoggedIn &&
              props.profileUser.username === props.authUser.username && (
                <EditIcon
                  cursor="pointer"
                  ml={5}
                  w={6}
                  h={6}
                  onClick={() => setEditModeBackGroundImage(true)}
                ></EditIcon>
              )}
            {EditModeBackGroundImage && (
              <Box>
                <Center gap="1rem" mb={2}>
                  <FormControl>
                    <Input
                      {...register("backgroundimage", {
                        required: true,
                        value: props.profileUser.backgroundimage,
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
                    onClick={() => setEditModeBackGroundImage(false)}
                  />
                </Center>

                <Button type="submit" colorScheme="purple" isFullWidth>
                  Save edit
                </Button>
              </Box>
            )}

            <Avatar
              size="xl"
              name={props.profileUser.username}
              src={props.profileUser.avatar}
            />
            {!!props.isLoggedIn &&
              props.profileUser.username === props.authUser.username && (
                <EditIcon
                  cursor="pointer"
                  ml={5}
                  w={6}
                  h={6}
                  onClick={() => setEditModeAvatar(true)}
                ></EditIcon>
              )}
            {editModeAvatar && (
              <Box>
                <Center gap="1rem" mb={2}>
                  <FormControl>
                    <Input
                      {...register("avatar", {
                        required: true,
                        value: props.profileUser.avatar,
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
                    onClick={() => setEditModeAvatar(false)}
                  />
                </Center>

                <Button type="submit" colorScheme="purple" isFullWidth>
                  Save edit
                </Button>
              </Box>
            )}
            <Flex>
              <Heading as="h1" size="2xl" color="white">
                {props.profileUser.username}
              </Heading>

              <Spacer />
            </Flex>
            </form>
          </Container>
        
      </Container>
    )
  );
}

export default ProfileHeader;
