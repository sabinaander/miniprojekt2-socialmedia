import { Flex, Container, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import TagIcon from "@mui/icons-material/Tag";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function SideBar() {
  return (
    <Container maxW="20vw" mt={10}>
      <Flex direction="column">
        <Link to="/">
          <Flex gap="2rem" mb={5}>
            <HomeIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{base:"none", md:"block"}}>Home</Text>
          </Flex>
        </Link>

        <Link to="/explore">
          <Flex gap="2rem" mb={5}>
            <TagIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{base:"none", md:"block"}}>Explore</Text>
          </Flex>
        </Link>

        <Link to="/notifications">
          <Flex gap="2rem" mb={5}>
            <NotificationsNoneIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{base:"none", md:"block"}}>Notifications</Text>
          </Flex>
        </Link>

        <Link to="/profile">
          <Flex gap="2rem" mb={5}>
            <PersonOutlineIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{base:"none", md:"block"}}>Profile</Text>
          </Flex>
        </Link>
        <Link to="/settings">
          <Flex gap="2rem" mb={5}>
            <MoreHorizIcon fontSize="medium" color="action" />
            <Text fontSize="lg" display={{base:"none", md:"block"}}>More</Text>
          </Flex>
        </Link>
      </Flex>
    </Container>
  );
}

export default SideBar;
