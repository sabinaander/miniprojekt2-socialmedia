import { Divider, Container, Text } from '@chakra-ui/react'
import CreatePostModal from '../components/CreatePostModal'
import PostsList from '../components/PostsList'

function StartPage() {
  return (
    <Container bg="gray.100" maxW="container.xl" padding={{ base: 1, md: 5 }}>
      <CreatePostModal />
      <Divider />
      <Text align="center" fontSize="4xl">
        Popular posts
      </Text>

      <PostsList />
    </Container>
  )
}

export default StartPage
