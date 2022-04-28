import { Divider, Container, Text } from '@chakra-ui/react'
import CreatePostModal from '../components/CreatePostModal'
import PostsList from '../components/PostsList'
import React, { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer'
import { getUser } from '../features/login-auth/loginauthservice'

function StartPage() {
  const store = useStore(loginauthreducer)
  const state = store.getState()
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn)
  const [authUser, setAuthUser] = useState(state.auth.user)

  useEffect(() => {
    const fetchAuthUser = async () => {
      if (store.getState().auth.user) {
        const authUser = await getUser(store.getState().auth.user.username)
        setAuthUser(authUser)
      }
    }
    fetchAuthUser()
  }, [])

  store.subscribe(async () => {
    setIsLoggedIn(store.getState().auth.isLoggedIn)
  })

  return (
    <Container bg="gray.100" maxW="100%" padding={{ base: 1, md: 5 }}>
      {isLoggedIn ? (
        <CreatePostModal user={authUser} />
      ) : (
        <Text fontSize="lg" textAlign="center">
          {' '}
          Log in to create posts{' '}
        </Text>
      )}
      <Divider />
      <Text align="center" fontSize="4xl">
        Popular posts
      </Text>

      <PostsList />
    </Container>
  )
}

export default StartPage
