import {
  FormControl,
  FormLabel,
  Text,
  Flex,
  Box,
  VStack,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../features/login-auth/loginauth";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const toast = useToast();
  let navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (e) => {
    setErrorMessage("");

    try {
      const user = await register(username, email, password);

      setUsername("");
      setEmail("");
      setPassword("");

      toast({
        title: "Signup successful!",
        description: "Redirecting to your new profile...",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      //navigate to profile
      navigate(`/profile/${user.username}`);
    } catch (e) {
      setErrorMessage(e.response.data.message);
      return;
    }
  };

  return (
    <Flex align="center" justify="center" h="30vh">
      <Box bg="white" p={6} rounded="md" w={64}>
        {errorMessage && (
          <Text border="1px" padding={2} color="red" textAlign="center" mb={3}>
            {errorMessage}
          </Text>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                variant="filled"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></Input>

              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                variant="filled"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>

              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                variant="filled"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </FormControl>
            <Button type="submit" colorScheme="purple" isFullWidth>
              Signup
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default SignupForm;
