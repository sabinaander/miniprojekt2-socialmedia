import { Flex, Container, Spacer, Box } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function ControlHeader() {
  return (
    <Container maxW="100%" padding={2} textAlign="center">
      <Flex>
        <Spacer />
        {/* All icons on profile */}
        <Flex gap={6}>
          <Link to="/">
            <Flex gap="2rem">
              <HomeIcon fontSize="medium" color="action" />
              <Link to="/notifications">
                <NotificationsNoneIcon fontSize="medium" color="action" />
              </Link>
              <Link to="/settings">
                <MoreHorizIcon fontSize="medium" color="action" />
              </Link>
              <Link to="/logout">
                <Box
                  as="button"
                  borderRadius="md"
                  bg="black"
                  color="white"
                  px={4}
                  h={7}
                >
                  Log Out
                </Box>
              </Link>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default ControlHeader;
