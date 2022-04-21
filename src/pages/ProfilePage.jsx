import { Grid, Divider, Container, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ControlHeader from "../components/ControlHeader";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import ProfileBio from "../components/ProfileBio";
import ProfileHeader from "../components/ProfileHeader";
function getPosts() {}

function ProfilePage() {
  // const { posts } = usePost()

  useEffect(() => {
    // data fetching here
  }, []);

  return (
    <Container bg="gray.100" maxW="container.xl">
      <ControlHeader />
      <ProfileHeader />
      <ProfileBio />
      <CreatePostModal />
      <Divider />
      <Text align="center" fontSize="4xl">
        Posts by Capt'n
        {/* {user.username} */}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={5}>
        <PostCard />
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

export default ProfilePage;
