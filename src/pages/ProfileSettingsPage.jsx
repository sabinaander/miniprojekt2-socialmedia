import { CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
  Divider,
  Container,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Heading,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteuser } from '../features/login-auth/loginauth'
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer'
import { getUser } from '../features/login-auth/loginauthservice'
import AccountSettingsForm from '../components/accountSettingsForm'

function ProfileSettingsPage() {
  const store = useStore(loginauthreducer)
  const state = store.getState()

  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn)
  const [authUser, setAuthUser] = useState(state.auth.user)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(authUser.username)
      setUser(user)
    }
    fetchUser()
  }, [])

  store.subscribe(async () => {
    setIsLoggedIn(store.getState().auth.isLoggedIn)
    setAuthUser(store.getState().auth.user)
    const user = await getUser(store.getState().auth.user.username)
    setUser(user)
  })

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    !!isLoggedIn &&
    !!user && (
      <Box pt={10} pb={10} pl={1} pr={1} bg="gray.100" w="100%">
        <Container
          textAlign="center"
          padding={{ base: 0, sm: 5 }}
          paddingBottom={10}
          backgroundColor="white"
        >
          <Heading>Account</Heading>
          <AccountSettingsForm user={user} />

          <Divider border="2px" mt={6} mb={6} />

          <Button
            variant="outline"
            border="2px"
            colorScheme="red"
            onClick={onOpen}
          >
            Delete account
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>Are you sure? This can't be reversed.</ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="red"
                  mr={3}
                  onClick={() => deleteuser(user.username)}
                >
                  DELETE
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Box>
    )
  )
}

export default ProfileSettingsPage
