import { Grid, Divider, Container, Text } from "@chakra-ui/react";
import UserControlHeader from "../components/UserControlHeader";
import CreatePostModal from "../components/CreatePostModal";
import ProfileBio from "../components/ProfileBio";
import ProfileHeader from "../components/ProfileHeader";
import PostsList from "../components/PostsList";

import loginauthservice from "../features/login-auth/loginauthservice";
function getPosts() {}

function ProfilePage() {
  
  const user = loginauthservice.getUser();

  return (
    <Container bg="gray.100" maxW="container.xl">
      <UserControlHeader />
      <ProfileHeader />
      <ProfileBio />
      <CreatePostModal />
      <Divider />
      <Text align="center" fontSize="4xl">
        Posts by
        {user.username}
      </Text>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        mt={5}
      >
        <PostsList/>
      </Grid>
    </Container>
  );
}

export default ProfilePage;
