import { Tr, Td, Button, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DeleteIcon } from '@chakra-ui/icons';
import SaveIcon from '@mui/icons-material/Save';

function AdminUserDetails(props) {
  const [userRole, setUserRole] = useState(props.user.role);

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
          onClick={() => {
            axios
              .put('http://localhost:5000/api/users/' + props.user._id, {
                role: userRole._id,
              })
              .then((res) => console.log('role saved'));
          }}
        >
          Save
        </Button>
        <Button
          rightIcon={<DeleteIcon />}
          onClick={() =>
            axios
              .delete('http://localhost:5000/api/users/' + props.user._id)
              .then((res) => console.log(res.data))
          }
        >
          Delete
        </Button>
      </Td>
    </Tr>
  );
}

export default AdminUserDetails;
