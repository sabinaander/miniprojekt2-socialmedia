import { Flex, Container, Spacer, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { logout } from "../features/login-auth/loginauth";
import { SettingsIcon } from "@chakra-ui/icons";

function UserControlHeader() {
  // const currentUser = JSON.parse(localStorage.getItem('user')) 
  
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
              <Button
                onClick={logout}
                borderRadius="md"
                bg="black"
                color="white"
                px={4}
                h={7}
                _hover={{
                  background: "gray.600",
                }}
              >
                Log Out
              </Button>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
}

export default UserControlHeader;
