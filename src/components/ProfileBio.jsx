import { Flex, Text, Container, Spacer, Center } from "@chakra-ui/react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import loginauthservice from "../features/login-auth/loginauthservice";

function ProfileBio() {
  const user = loginauthservice.getUser();

  return (
    <Container maxW="60%" padding={2} borderColor="gray.200">
      <Text align="center" fontWeight="bold" mb={5}>
        About {user.username}
      </Text>
      <Text align="center" mb={5}>
        {user.bio}
      </Text>
      <Spacer />

      {/* All social media links on profile */}
      <Text align="center" fontWeight="bold" mb={5}>
        Also follow me on
      </Text>
      <Center>
        <Flex gap={6}>
          <Flex gap="2rem" mb={5}>
            <a href={`${user.facebook}`}>
              <FacebookIcon fontSize="medium" color="action" />
            </a>
            <a href={`${user.instagram}`}>
              <InstagramIcon fontSize="medium" color="action" />
            </a>
            <a href={`${user.twitter}`}>
              <TwitterIcon fontSize="medium" color="action" />
            </a>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}

export default ProfileBio;
