import { Divider, Container, Text } from "@chakra-ui/react";
import CreatePostModal from "../components/CreatePostModal";
import PostsList from "../components/PostsList";
import React, { useState, useEffect } from "react";
import userservice from "../features/login-auth/userservice";

function StartPage() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [content, setContent] = useState("");
  useEffect(() => {
    userservice.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        console.log("error");
      }
    );
  }, []);
  return (
    <Container bg="gray.100" maxW="container.xl" padding={{ base: 1, md: 5 }}>
      <h3>{content}</h3>
      {currentUser ? <CreatePostModal /> : <Text fontSize='lg' textAlign="center"> Log in to create posts </Text>}
      <Divider />
      <Text align="center" fontSize="4xl">
        Popular posts
      </Text>

      <PostsList />
    </Container>
  );
}

export default StartPage;
