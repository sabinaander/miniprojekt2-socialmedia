import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Center,
  Heading,
  Spacer,
  Container,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { SearchIcon } from "@chakra-ui/icons";

function Header() {
  return (
    <Container maxW="100%" border='1px' padding={2} borderColor='gray.200'>
      <Flex>
        <Center gap={10}>
          <Link to="/">
            <Heading as="h1" size="2xl">
              Socialmblr
            </Heading>
          </Link>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input placeholder="Search for posts..." />
          </InputGroup>
        </Center>

        <Spacer />
        <Center>
          <Flex gap={6}>
            <Link to="/login">
              <Box
                as="button"
                borderRadius="md"
                bg="#00A3C4"
                color="white"
                px={4}
                h={8}
              >
                Log in
              </Box>
            </Link>

            <Link to="/signup">
              <Box
                as="button"
                borderRadius="md"
                bg="#00A3C4"
                color="white"
                px={4}
                h={8}
              >
                Sign up
              </Box>
            </Link>
          </Flex>
        </Center>
      </Flex>
    </Container>
  );
}

export default Header;
