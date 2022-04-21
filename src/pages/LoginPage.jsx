import { Container, Heading } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <Container bg="gray.100" maxW="container.xl" padding={{ base: 1, md: 5 }}>
        <Heading>Log in to your account</Heading>
      <LoginForm />
    </Container>
  );
}

export default LoginPage;
