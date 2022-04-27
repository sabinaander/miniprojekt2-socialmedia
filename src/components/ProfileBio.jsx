import {
  Container,
  Text,
  Box,
  Button,
  useDisclosure,
  Flex,
  Spacer,
  useToast,
  FormControl,
  Input,
  Center,
  FormLabel,
} from "@chakra-ui/react";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { update } from "../features/login-auth/loginauth";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function ProfileBio(props) {
  const [EditModeBio, setEditModeBio] = useState(false);
  const [editModeWebsite, setEditModeWebsite] = useState(false);

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
      setEditModeBio(false);
      setEditModeWebsite(false);
      props.loadUser(props.profileUser.username)
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    props.profileUser && (
      <Container
        mt="20vh"
        align="center"
        maxW="60%"
        padding={2}
        borderColor="gray.200"
      >
        <Box>
          <Center>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Text fontWeight="bold" mb={5}>
                  About {props.profileUser.username}
                  {!!props.isLoggedIn &&
                    props.profileUser.username === props.authUser.username && (
                      <EditIcon
                        cursor="pointer"
                        mr={5}
                        w={6}
                        h={6}
                        onClick={() => setEditModeBio(true)}
                      />
                      // <Text>Add some text about yourself</Text>
                    )}
                </Text>
              </Center>
              <Text mb={5}>{props.profileUser.bio}</Text>
              {/* EDIT BIO */}

              {EditModeBio && (
                <Box>
                  <Center gap="1rem" mb={2}>
                    <FormControl>
                      <Input
                        {...register("bio", {
                          value: props.profileUser.bio,
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
                      onClick={() => setEditModeBio(false)}
                    />
                  </Center>

                  <Button type="submit" colorScheme="purple" isFullWidth>
                    Save edit
                  </Button>
                </Box>
              )}

              <Spacer />

              {/* All social media links on profile */}
              <Text align="center" fontWeight="bold" mb={5}>
                Also follow me on
              </Text>
              <Center>
                <Flex gap={6}>
                  <Flex gap="2rem" mb={5}>
                    {props.profileUser.website && (
                      <>
                        {props.profileUser.website.facebook && (
                          <a
                            href={`https://www.facebook.com/${props.profileUser.website.facebook}`}
                            target="_blank"
                          >
                            <FacebookIcon fontSize="medium" color="action" />
                          </a>
                        )}
                        {props.profileUser.website.instagram && (
                          <a
                            href={`https://www.instagram.com/${props.profileUser.website.instagram}`}
                            target="_blank"
                          >
                            <InstagramIcon fontSize="medium" color="action" />
                          </a>
                        )}
                        {props.profileUser.website.twitter && (
                          <a
                            href={`https://www.twitter.com/${props.profileUser.website.twitter}`}
                            target="_blank"
                          >
                            <TwitterIcon fontSize="medium" color="action" />
                          </a>
                        )}
                        {props.profileUser.website.linkedin && (
                          <a
                            href={`https://www.linkedin.com/in/${props.profileUser.website.linkedin}`}
                            target="_blank"
                          >
                            <LinkedInIcon fontSize="medium" color="action" />
                          </a>
                        )}
                      </>
                    )}
                    {/* EDIT WEBSITE LINKS */}
                    {!!props.isLoggedIn &&
                      props.profileUser.username ===
                        props.authUser.username && (
                        <>
                          {" "}
                          <EditIcon
                            cursor="pointer"
                            ml={5}
                            w={6}
                            h={6}
                            onClick={() => setEditModeWebsite(true)}
                          />
                          <Text>Add some social media links</Text>
                        </>
                      )}
                    {editModeWebsite && (
                      <Box>
                        <Center gap="1rem" mb={2}>
                          <FormControl>
                            <FormLabel>Facebook username:</FormLabel>
                            <Input
                              {...register("website.facebook", {
                                value: props.profileUser.website?.facebook,
                              })}
                            />
                            <FormLabel>Instagram username:</FormLabel>
                            <Input
                              {...register("website.instagram", {
                                value: props.profileUser.website?.instagram,
                              })}
                            />
                            <FormLabel>Twitter username:</FormLabel>
                            <Input
                              {...register("website.twitter", {
                                value: props.profileUser.website?.twitter,
                              })}
                            />
                            <FormLabel>Linkedin username:</FormLabel>
                            <Input
                              {...register("website.linkedin", {
                                value: props.profileUser.website?.linkedin,
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
                            onClick={() => setEditModeWebsite(false)}
                          />
                        </Center>

                        <Button type="submit" colorScheme="purple" isFullWidth>
                          Save edit
                        </Button>
                      </Box>
                    )}
                  </Flex>
                </Flex>
              </Center>
            </form>
          </Center>
        </Box>
      </Container>
    )
  );
}

export default ProfileBio;
