import {
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

function AdminContent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setUsers(res.data));
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
                <Tr key={index}>
                  <Td>{user.username}</Td>
                  <Td>{user.role.name}</Td>
                  <Td>Action</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

export default AdminContent;
