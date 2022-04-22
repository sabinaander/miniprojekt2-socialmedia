import { Flex, Container, Spacer, Box, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { logout } from "../features/login-auth/loginauth";
import { SettingsIcon } from "@chakra-ui/icons";

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
                <SettingsIcon fontSize="medium" color="action" />
              </Link>
              <Button onClick={logout}>
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
              </Button>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default ControlHeader;
