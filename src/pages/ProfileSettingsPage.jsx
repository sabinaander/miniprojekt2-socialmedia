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
import { useState, useEffect } from "react";
import ControlHeader from "../components/ControlHeader";

function ProfileSettingsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { posts } = usePost()

  useEffect(() => {
    // data fetching here
  }, []);

  return (
    <Container bg="gray.100" maxW="container.xl">
      <ControlHeader />
      <Container padding={5} paddingBottom={10}>
      <Container textAlign="center" backgroundColor="white" padding={5}>
        <Heading >Account</Heading>
        <Divider border="2px" mt={6} mb={6} />
        <Flex>
          <Text fontSize="2xl">Email</Text>
          <Spacer />
          <Text> testemail@test.com {/* {user.email} */}</Text>
          <EditIcon ml={5} w={6} h={6} onClick={{}}></EditIcon>
        </Flex>

        <Divider border="2px" mt={6} mb={6} />

        <Flex>
          <Text fontSize="2xl">Username</Text>
          <Spacer />
          <Text>Testusername{/* {user.username} */}</Text>
          <EditIcon ml={5} w={6} h={6} onClick={{}}></EditIcon>
        </Flex>

        <Divider border="2px" mt={6} mb={6} />

        <Flex>
          <Text fontSize="2xl">Password</Text>
          <Spacer />
          <Text>********{/* {user.password} */}</Text>
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
              <Button colorScheme="blue" mr={3} onClick={{}}>
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
