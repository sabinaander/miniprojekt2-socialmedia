import { Flex, Text, Container, Spacer, Center } from "@chakra-ui/react";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function ProfileBio(props) {
  const user = props.user;
  return (
    user && (
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
              {user.website && (
                <>
                  {user.website.facebook && (
                    <a href={`${user.website.facebook}`}>
                      <FacebookIcon fontSize="medium" color="action" />
                    </a>
                  )}
                  {user.website.instagram && (
                    <a href={`${user.website.instagram}`}>
                      <InstagramIcon fontSize="medium" color="action" />
                    </a>
                  )}
                  {user.website.twitter && (
                    <a href={`${user.website.twitter}`}>
                      <TwitterIcon fontSize="medium" color="action" />
                    </a>
                  )}
                  {user.website.linkedin && (
                    <a href={`${user.website.linkedin}`}>
                      <LinkedInIcon fontSize="medium" color="action" />
                    </a>
                  )}
                </>
              )}
            </Flex>
          </Flex>
        </Center>
      </Container>
    )
  );
}

export default ProfileBio;
