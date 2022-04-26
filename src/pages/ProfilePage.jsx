import { Divider, Container, Text } from '@chakra-ui/react'
import UserControlHeader from '../components/UserControlHeader'
import CreatePostModal from '../components/CreatePostModal'
import ProfileBio from '../components/ProfileBio'
import ProfileHeader from '../components/ProfileHeader'
import PostsList from '../components/PostsList'
import loginauthservice from '../features/login-auth/loginauthservice'
import { useStore } from 'react-redux'
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ProfilePage() {
  const store = useStore(loginauthreducer)
  const state = store.getState()
  const [loggedinUser, setLoggedinUser] = useState(state.auth.user)
  const [user, setUser] = useState(null)
  const params = useParams()

  store.subscribe(() => {
    setLoggedinUser(store.getState().auth.user)
  })

  const loadUser = async () => {
    const user = await loginauthservice.getUser(params.username)
    setUser(user)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    user && (
      <Container bg="gray.100" maxW="container.xl">
        <UserControlHeader />
        <ProfileHeader user={user} />
        <ProfileBio user={user} />
        {user.username === loggedinUser.username && <CreatePostModal />}

        <Divider />
        <Text align="center" fontSize="4xl">
          Posts by
          {user.username}
        </Text>
        <PostsList author={user.username} />
      </Container>
    )
  )
}

export default ProfilePage
