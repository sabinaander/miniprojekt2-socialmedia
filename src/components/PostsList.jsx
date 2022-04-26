import { useSelector } from 'react-redux'
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from '../features/blogPosts/postsSlice'
import { Grid, Spinner } from '@chakra-ui/react'
import PostCard from './PostCard'

function PostsList({ author }) {
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  let content
  if (postStatus === 'loading') {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    )
  } else if (postStatus === 'succeeded') {
    const filteredPosts = author
      ? posts.filter((post) => post.author === author)
      : posts
    const orderedPosts = filteredPosts
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    content = orderedPosts.map((post) => (
      <PostCard key={post._id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gap={6}
      mt={5}
    >
      {content}
    </Grid>
  )
}

export default PostsList
