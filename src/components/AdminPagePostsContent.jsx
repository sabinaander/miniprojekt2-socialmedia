import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import AdminPostsAccordion from './AdminPostsAccordion';
import {
  fetchPosts,
  selectAllPosts,
  getPostsStatus,
  getPostsError,
} from '../features/blogPosts/postsSlice';

function AdminPagePostsContent() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === 'loading') {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    );
  } else if (postStatus === 'succeeded') {
    content = posts.map((post, index) => (
      <AdminPostsAccordion
        key={index}
        post={post}
        title={post.title}
        image={post.image}
        content={post.content}
        author={post.author}
      />
    ));
  } else if (postStatus === 'failed') {
    content = <Text>{error}</Text>;
  }

  return (
    <Flex
      bg="whiteAlpha.100"
      h="fit-content"
      minHeight="100vh"
      w="100%"
      justifyContent="center"
    >
      <Box w="70%" bg="gray.200">
        <Heading
          bg="gray.300"
          padding="2rem"
          marginBottom="1rem"
          textAlign="center"
          size="lg"
        >
          Posts
        </Heading>
        {content}
      </Box>
    </Flex>
  );
}

export default AdminPagePostsContent;
