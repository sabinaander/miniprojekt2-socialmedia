import { Flex, Container, Text, useRadio, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { SettingsIcon } from "@chakra-ui/icons";
import { useStore } from "react-redux";
import loginauthreducer from "../features/login-auth/reducers/loginauthreducer";
import { useState } from "react";

function SideBar() {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn);
  const [user, setUser] = useState(state.auth.user);

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn);
    setUser(store.getState().auth.user);
  });

  return (
    <Box margin="0px" padding="0px" id="a" w="max-content" mt={10} pl={5} pr={5}>
      <Flex direction="column" >
        <Link to="/">
          <Flex gap="2rem" mb={5}>
            <HomeIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{ base: "none", md: "block" }}>
              Home
            </Text>
          </Flex>
        </Link>

        <Link to="/explore">
          <Flex gap="2rem" mb={5}>
            <TagIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{ base: "none", md: "block" }}>
              Explore
            </Text>
          </Flex>
        </Link>

        <Link to="/notifications">
          <Flex gap="2rem" mb={5}>
            <NotificationsNoneIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{ base: "none", md: "block" }}>
              Notifications
            </Text>
          </Flex>
        </Link>

        <Link to={`/profile/${user.username}`}>
          <Flex gap="2rem" mb={5}>
            <PersonOutlineIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{ base: "none", md: "block" }}>
              Profile
            </Text>
          </Flex>
        </Link>
        <Link to="/settings">
          <Flex gap="2rem" mb={5}>
            <SettingsIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{ base: "none", md: "block" }}>
              Settings
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
}

export default SideBar;
