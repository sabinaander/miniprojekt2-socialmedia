import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Select, Tr, Td } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import SaveIcon from '@mui/icons-material/Save';

function AdminUserDetails(props) {
  const [userRole, setUserRole] = useState(props.user.role);

  useEffect(() => {
    setUserRole(props.user.role);
  }, [props.user.role]);

  return (
    <Tr>
      <Td>{props.user.username}</Td>
      <Td>
        <Select
          onChange={(e) => {
            setUserRole(props.roles[e.target.options.selectedIndex]);
          }}
          defaultValue={props.user.role._id}
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
          isDisabled={userRole._id === props.user.role._id}
          onClick={() =>
            axios
              .put(
                'http://localhost:5000/api/users/' + props.user.username,
                {
                  role: userRole._id,
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
        <Button
          rightIcon={<DeleteIcon />}
          onClick={() =>
            axios
              .delete(
                'http://localhost:5000/api/users/' + props.user.username,
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
