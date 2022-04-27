import { Divider, Container, Text } from "@chakra-ui/react";
import UserControlHeader from "../components/UserControlHeader";
import CreatePostModal from "../components/CreatePostModal";
import ProfileBio from "../components/ProfileBio";
import ProfileHeader from "../components/ProfileHeader";
import PostsList from "../components/PostsList";
import loginauthservice from "../features/login-auth/loginauthservice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";

function ProfilePage() {
  const store = useStore(loginauthreducer);
  const state = store.getState();

  const [profileUser, setProfileUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [authUser, setAuthUser] = useState(state.auth.user);

  const params = useParams();

  const loadUser = async () => {
    const profileUser = await loginauthservice.getUser(params.username);
    setProfileUser(profileUser);
  };

  store.subscribe(async () => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setAuthUser(store.getState().auth.user);
  });

  useEffect(() => {
    loadUser();
  },[);

  return (
    profileUser && (
      <Container bg="gray.100" maxW="container.xl" p="0px">
        <UserControlHeader />
        <ProfileHeader authUser={authUser} profileUser={profileUser} isLoggedIn={isLoggedIn} />
        <ProfileBio authUser={authUser} profileUser={profileUser} isLoggedIn={isLoggedIn} />
        {!!isLoggedIn && profileUser.username === authUser.username && (
          <CreatePostModal user={profileUser}/>
        )}

        <Divider />
        <Text align="center" fontSize="4xl">
          Posts by{' '}
          {profileUser.username}
        </Text>
        <PostsList author={profileUser.username} />
      </Container>
    )
  );
}

export default ProfilePage;
