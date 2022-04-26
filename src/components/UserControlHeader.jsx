import { Flex, Container, Spacer, Button, Link } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { logout } from '../features/login-auth/loginauth'
import { SettingsIcon } from '@chakra-ui/icons'

function UserControlHeader() {
  return (
    <Container maxW="100%" padding={2} textAlign="center">
      <Flex>
        <Spacer />
        {/* All icons on profile */}
        <Flex gap={6}>
          <Link as={ReactLink} to="/">
            <HomeIcon fontSize="medium" color="action" />
          </Link>

          <Link as={ReactLink} to="/notifications">
            <NotificationsNoneIcon fontSize="medium" color="action" />
          </Link>
          <Link as={ReactLink} to="/settings">
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
              background: 'gray.600',
            }}
          >
            Log Out
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}

export default UserControlHeader
