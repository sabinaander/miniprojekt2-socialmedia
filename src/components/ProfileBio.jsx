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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { update } from "../features/login-auth/loginauth";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function ProfileBio(props) {
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState("");

  const bioDisclosure = useDisclosure();
  const websiteDisclosure = useDisclosure();

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
      bioDisclosure.onClose();
      websiteDisclosure.onClose();

      props.loadUser(props.profileUser.username);
      
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    props.profileUser && (
      <Container
        align="center"
        maxW="60%"
        padding={2}
        borderColor="gray.200"
      >
        <Box>
          <Center>
            <form id="bioForm" onSubmit={handleSubmit(onSubmit)}>
              <Center>
                <Text fontWeight="bold" mb={5}>
                  About {props.profileUser.username}
                  {!!props.isLoggedIn &&
                    props.profileUser.username === props.authUser.username && (
                      <Tooltip
                        hasArrow
                        label="Add some text about yourself"
                        bg="gray.300"
                        color="black"
                      >
                        <EditIcon
                          cursor="pointer"
                          ml={2}
                          w={6}
                          h={6}
                          onClick={bioDisclosure.onOpen}
                        />
                      </Tooltip>
                    )}
                </Text>
              </Center>
              <Text mb={5}>{props.profileUser.bio}</Text>
              {/* EDIT BIO */}

              <Modal
                closeOnOverlayClick={false}
                isOpen={bioDisclosure.isOpen}
                onClose={bioDisclosure.onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit your bio</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <Center gap="1rem" mb={2}>
                      <FormControl>
                        <Input
                        height="10rem"
                          {...register("bio", {
                            value: props.profileUser.bio,
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
                    <Button onClick={bioDisclosure.onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>

              <Spacer />

              {/* All social media links on profile */}
              <Center>
                <Text fontWeight="bold" mb={5}>
                  Also follow me on
                  {/* EDIT WEBSITE LINKS */}
                  {!!props.isLoggedIn &&
                    props.profileUser.username === props.authUser.username && (
                      <>
                        <Tooltip
                          hasArrow
                          label="Add some social media links"
                          bg="gray.300"
                          color="black"
                        >
                          <EditIcon
                            cursor="pointer"
                            ml={2}
                            w={6}
                            h={6}
                            onClick={websiteDisclosure.onOpen}
                          />
                        </Tooltip>
                      </>
                    )}
                </Text>
              </Center>
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

                  <Modal
                    closeOnOverlayClick={false}
                    isOpen={websiteDisclosure.isOpen}
                    onClose={websiteDisclosure.onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Edit website links</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
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
                        <Button onClick={websiteDisclosure.onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </Flex>
            </form>
          </Center>
        </Box>
      </Container>
    )
  );
}

export default ProfileBio;
