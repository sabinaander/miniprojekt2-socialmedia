import { useState, useEffect } from 'react';
import { useStore } from 'react-redux';
import axios from 'axios';
import {
  Button,
  Select,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import SaveIcon from '@mui/icons-material/Save';
import AccountSettingsForm from './accountSettingsForm';
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer';

function AdminUserDetails(props) {
  const [userEditState, setUserEditState] = useState(props.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const store = useStore(loginauthreducer);
  const state = store.getState();

  useEffect(() => {
    setUserEditState(props.user);
  }, [props.user]);

  return (
    <Tr>
      <Td>{userEditState.username}</Td>
      <Td>
        <Select
          onChange={(e) => {
            setUserEditState({
              ...userEditState,
              role: props.roles[e.target.options.selectedIndex],
            });
          }}
          defaultValue={userEditState.role._id}
        >
          {props.roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </Select>
      </Td>
      <Td>
        <Button
          margin="0 1rem"
          rightIcon={<SaveIcon />}
          isDisabled={userEditState.role._id === props.user.role._id}
          onClick={() =>
            axios
              .put(
                'http://localhost:5000/api/users/' + userEditState.username,
                {
                  role: userEditState.role._id,
                },
                { withCredentials: true }
              )
              .then((res) => console.log('role saved'))
              .catch((error) => {
                props.setError(error.response.data.message);
                props.displayError();
              })
          }
        >
          Save
        </Button>
        <Button onClick={onOpen}>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User settings</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <AccountSettingsForm
                user={userEditState}
                adminEdit={state.auth.user.username !== userEditState.username}
                setUserEditState={setUserEditState}
              />
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>

        <Button
          rightIcon={<DeleteIcon />}
          onClick={() =>
            axios
              .delete(
                'http://localhost:5000/api/users/' + userEditState.username,
                {
                  withCredentials: true,
                }
              )
              .then(() => props.removeUserFromState())
              .catch((error) => {
                props.setError(error.response.data?.message);
                props.displayError();
              })
          }
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}

export default AdminUserDetails;
