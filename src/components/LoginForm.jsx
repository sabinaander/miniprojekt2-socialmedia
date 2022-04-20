import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Flex,
    Box
  } from '@chakra-ui/react'
  import { useForm } from "react-hook-form";

  function LoginForm() {
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = useForm();  
    return (
        <Flex bg="gray.100" align="center" justify="center" h="100vh">
           <Box bg="white" p={6} rounded="md" w={64}>
              <form></form>
            </Box>
        </Flex>
      )
    }

export default LoginForm;