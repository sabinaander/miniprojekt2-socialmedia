import { Grid, Divider, Container, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";

function getPublicPosts() {
  let publicPosts = [];
  return publicPosts;
}

function StartPage() {
  // const { posts } = usePost()

  const { posts } = [];

  const [publicPosts] = useState(getPublicPosts(posts, 10));

  useEffect(() => {
    // data fetching here
  }, []);

  return (
    <Container bg="gray.100" maxW="container.xl" padding={{base:1,md:5}}>
      <CreatePostModal />
      <Divider />
      <Text align="center" fontSize="4xl">
        Popular posts
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md:"repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        mt={5}
      >
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />

        {/* {publicPosts && publicPosts.map((post) => (
        <PostCard key ={post.id} post={post} />
      ))} */}
      </Grid>
    </Container>
  );
}

export default StartPage;
