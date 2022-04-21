import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Box,
    VStack,
    Input,
    Button
  } from '@chakra-ui/react'
  import { useForm } from "react-hook-form";

  function LoginForm() {
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = useForm();  

    function onSubmit() {
        console.log('hej')
      }

    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
           <Box bg="white" p={6} rounded="md" w={64}>
             <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <FormControl>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input id='email' type='email' variant='filled'></Input>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input id='password' type='password' variant='filled'></Input>
                </FormControl>
                <Button type="submit" colorScheme="purple" isFullWidth>
                    Login
                  </Button>
                </VStack>
              </form>
            </Box>
        </Flex>
      )
    }

export default LoginForm;