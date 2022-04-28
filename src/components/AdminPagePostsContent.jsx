import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Accordion, Box, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import AdminPostsAccordion from './AdminPostsAccordion';
import {
  deletePost,
  fetchPosts,
  getPostsStatus,
  getPostsError,
  selectAllPosts,
} from '../features/blogPosts/postsSlice';

function AdminPagePostsContent() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts, shallowEqual);
  const postStatus = useSelector(getPostsStatus, shallowEqual);
  const error = useSelector(getPostsError, shallowEqual);
  const [accordionIndex, setAccordionIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const deleteBlogPost = (id) => {
    dispatch(deletePost(id));
    setAccordionIndex(null);
  };

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
    content = (
      <Accordion
        index={accordionIndex}
        onChange={(i) => setAccordionIndex(i)}
        allowToggle
        margin="0.5rem 0"
      >
        {posts.map((post, index) => (
          <AdminPostsAccordion
            key={index}
            post={post}
            title={post.title}
            image={post.image}
            content={post.content}
            author={post.author}
            deletePost={() => deleteBlogPost(post._id)}
          />
        ))}
      </Accordion>
    );
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
