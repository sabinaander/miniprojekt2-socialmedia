import { Divider, Container, Text } from "@chakra-ui/react";
import CreatePostModal from "../components/CreatePostModal";
import PostsList from "../components/PostsList";
import React, { useState } from "react";
import { useStore } from "react-redux";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";

function StartPage() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });
  return (
    <Container bg="gray.100" maxW="container.xl" padding={{ base: 1, md: 5 }}>
      
      {isLoggedIn ? <CreatePostModal /> : <Text fontSize='lg' textAlign="center"> Log in to create posts </Text>}
      <Divider />
      <Text align="center" fontSize="4xl">
        Popular posts
      </Text>

      <PostsList />
    </Container>
  );
}

export default StartPage;
