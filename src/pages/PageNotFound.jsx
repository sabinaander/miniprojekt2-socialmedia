import { Center, Container, Heading } from '@chakra-ui/react';
import React from 'react';

function PageNotFound() {
  return (
    <Container>
      <Center mt="10rem">
        <Heading>Oops! Page not found!</Heading>
      </Center>
    </Container>
  );
}

export default PageNotFound;
