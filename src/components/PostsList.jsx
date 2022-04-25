import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPosts,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from '../features/blogPosts/postsSlice'
import { Grid, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import PostCard from './PostCard'

function PostsList() {
  const dispatch = useDispatch()

  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus)
  const error = useSelector(getPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

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
    const orderedPosts = posts
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
