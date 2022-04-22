import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Input,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { login } from "../features/login-auth/loginauth";


function LoginForm() {
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
      const user = await login(email, password);
      console.log(user)
      setEmail("");
      setPassword("");

      toast({
        title: "Login successful!",
        description: "Redirecting to your profile...",
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
              Log in
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}

export default LoginForm;
