import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminUserDetails from './AdminUserDetails';

const API_URL_GET_USERS = 'http://localhost:5000/api/users/';
const API_URL_GET_ROLES = 'http://localhost:5000/api/users/roles/';

function AdminContent() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(API_URL_GET_USERS).then((res) => setUsers(res.data));
    axios.get(API_URL_GET_ROLES).then((res) => setRoles(res.data));
  }, []);

  return (
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
                <AdminUserDetails key={index} user={user} roles={roles} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default AdminContent;
