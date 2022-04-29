import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Input,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { update, updateUserByAdmin } from '../features/login-auth/loginauth';

function AccountSettingsForm({ user, adminEdit, setUserEditState }) {
  const [editModeEmail, setEditModeEmail] = useState(false);
  const [editModeUsername, setEditModeUsername] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [,setErrorMessage] = useState('');

  const toast = useToast();

  const { register, handleSubmit, getValues, setValue } = useForm();

  const onSubmit = async () => {
    setErrorMessage('');
    const newValues = getValues();

    try {
      const updatedUser = { ...user, ...newValues };
      adminEdit
        ? await updateUserByAdmin(user.username, updatedUser)
        : await update(user.username, updatedUser);

      if (setUserEditState) {
        setUserEditState(updatedUser);
      }

      toast({
        title: 'Edit successful!',
        description: '',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      setValue('password', '');
      setEditModeEmail(false);
      setEditModePassword(false);
      setEditModeUsername(false);
    } catch (e) {
      console.log(e);
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Divider border="2px" mt={6} mb={6} />
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Text fontSize="2xl">Email</Text>
        <Spacer />
        {!editModeEmail && (
          <Center>
            <Text>{user.email}</Text>
            <EditIcon
              cursor="pointer"
              ml={5}
              w={6}
              h={6}
              onClick={() => setEditModeEmail(true)}
            ></EditIcon>
          </Center>
        )}
        {editModeEmail && (
          <Box>
            <Center gap="1rem" mb={2}>
              <FormControl>
                <Input
                  {...register('email', {
                    required: true,
                    value: user.email,
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
                onClick={() => setEditModeEmail(false)}
              />
            </Center>

            <Button type="submit" colorScheme="purple" isFullWidth>
              Save edit
            </Button>
          </Box>
        )}
      </Flex>

      <Divider border="2px" mt={6} mb={6} />

      <Flex direction={{ base: 'column', md: 'row' }}>
        <Text fontSize="2xl">Username</Text>
        <Spacer />
        {!editModeUsername && (
          <Center>
            <Text>{user.username}</Text>
            <EditIcon
              ml={5}
              w={6}
              h={6}
              cursor="pointer"
              onClick={() => setEditModeUsername(true)}
            />
          </Center>
        )}

        {editModeUsername && (
          <Box>
            <Center gap="1rem" mb={2}>
              <FormControl>
                <Input
                  {...register('username', {
                    required: true,
                    value: user.username,
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
                onClick={() => {
                  setEditModeUsername(false);
                }}
              />
            </Center>

            <Button type="submit" colorScheme="purple" isFullWidth>
              Save edit
            </Button>
          </Box>
        )}
      </Flex>

      <Divider border="2px" mt={6} mb={6} />

      <Flex direction={{ base: 'column', md: 'row' }}>
        <Text fontSize="2xl">Password</Text>
        <Spacer />
        {!editModePassword && (
          <Center>
            <Text>{user.password}</Text>
            <EditIcon
              cursor="pointer"
              ml={5}
              w={6}
              h={6}
              onClick={() => setEditModePassword(true)}
            ></EditIcon>
          </Center>
        )}
        {editModePassword && (
          <Box>
            <Center gap="1rem" mb={2}>
              <FormControl>
                <Input
                  {...register('password', {
                    required: true,
                    value: user.password,
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
                onClick={() => {
                  setEditModePassword(false);
                }}
              />
            </Center>

            <Button type="submit" colorScheme="purple" isFullWidth>
              Save edit
            </Button>
          </Box>
        )}
      </Flex>
    </form>
  );
}

export default AccountSettingsForm;
