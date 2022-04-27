import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import AdminUserDetails from './AdminUserDetails';

const API_URL_GET_USERS = 'http://localhost:5000/api/users/';
const API_URL_GET_ROLES = 'http://localhost:5000/api/users/roles/';

function AdminContent() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get(API_URL_GET_USERS, { withCredentials: true })
      .then((res) => setUsers(res.data));
    axios
      .get(API_URL_GET_ROLES, { withCredentials: true })
      .then((res) => setRoles(res.data));
  }, []);

  return (
    <>
      <Flex bg="whiteAlpha.100" h="800px" w="100%" justifyContent="center">
        <Box w="70%" bg="gray.200">
          <Heading bg="gray.300" padding="2rem" textAlign="center" size="lg">
            User Management
          </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Users</Th>
                  <Th>Role</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user, index) => (
                  <AdminUserDetails
                    key={index}
                    user={user}
                    roles={roles}
                    setError={setError}
                    displayError={onOpen}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{error}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminContent;
