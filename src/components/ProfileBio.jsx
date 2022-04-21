import { Flex, Text, Container, Spacer, Center } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function ProfileBio() {
  return (
    <Container maxW="60%" padding={2} borderColor="gray.200">
        <Text align="center" fontWeight="bold" mb={5}>About Capt'n</Text>
        <Text align="center" mb={5}>
        A simple man from the avengers. 100% the best of them, Hulk sucks.
        Ususally posts pictures with my cats, food and my momma.
      </Text>
      <Spacer />
      {/* All social media links on profile */}
      <Text align="center" fontWeight="bold" mb={5} >Also follow me on</Text>
      <Center>
        <Flex gap={6}>
          <Link to="/">
            <Flex gap="2rem" mb={5}>
              <FacebookIcon fontSize="medium" color="action" />
              <Link to="/notifications">
                <InstagramIcon fontSize="medium" color="action" />
              </Link>
              <Link to="/settings">
                <TwitterIcon fontSize="medium" color="action" />
              </Link>
            </Flex>
          </Link>
        </Flex>
      </Center>
    </Container>
  );
}

export default ProfileBio;
