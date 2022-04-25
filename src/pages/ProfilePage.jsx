import { Grid, Divider, Container, Text } from "@chakra-ui/react";
import UserControlHeader from "../components/UserControlHeader";
import CreatePostModal from "../components/CreatePostModal";
import ProfileBio from "../components/ProfileBio";
import ProfileHeader from "../components/ProfileHeader";
import PostsList from "../components/PostsList";
import loginauthservice from "../features/login-auth/loginauthservice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function getPosts() {}

function ProfilePage() {
  const [user, setUser] = useState(null);
  const params = useParams();
  useEffect(() => {
    const loadUser = async () => {
      const user = await loginauthservice.getUser(params.username);
      setUser(user);
    };
    loadUser();
  }, []);

  return (
    user && (
      <Container bg="gray.100" maxW="container.xl">
        <UserControlHeader />
        <ProfileHeader user={user} />
        <ProfileBio user={user} />
        <CreatePostModal />
        <Divider />
        <Text align="center" fontSize="4xl">
          Posts by
          {user.username}
        </Text>
          <PostsList />
      </Container>
    )
  );
}

export default ProfilePage;
