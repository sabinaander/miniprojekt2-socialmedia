import {
  Flex,
  Heading,
  Avatar,
  Container,
  Spacer,
} from "@chakra-ui/react";
import loginauthservice from "../features/login-auth/loginauthservice";

function ProfileHeader() {
  const user = loginauthservice.getUser();
  return (
    <Container maxW="100%" padding={0}>
      <Container
        maxW="100%"
        height="30vh"
        padding={2}
        backgroundImage={user.backgroundImage}
      >
        <Avatar
          size="xl"
          name={user.username}
          src={user.avatar}
        />
        <Flex>
          
          <Heading as="h1" size="2xl" color="white">
            {user.username}
          </Heading>

          <Spacer />
        </Flex>
      </Container>
    </Container>
  );
}

export default ProfileHeader;
