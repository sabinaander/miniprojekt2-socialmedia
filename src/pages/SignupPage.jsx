import { Container, Heading } from "@chakra-ui/react";
import LoginForm from '../components/LoginForm';


function SignupPage() {
    return(
    <Container bg="gray.100" maxW="container.xl" padding={{ base: 1, md: 5 }}>
    <Heading>Sign up</Heading>
      <LoginForm />
    </Container>
    )
}

export default SignupPage;