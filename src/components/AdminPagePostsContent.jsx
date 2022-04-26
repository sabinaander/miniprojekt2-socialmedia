import { Flex, Box, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AdminPostsAccordion from './AdminPostsAccordion';
import axios from 'axios';

const API_URL_GET_POSTS = 'http://localhost:5000/api/blogPosts/';

function AdminPagePostsContent() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(API_URL_GET_POSTS).then((res) => setPosts(res.data));
  }, []);

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
        {posts.map((post, index) => (
          <AdminPostsAccordion
            key={index}
            post={post}
            title={post.title}
            image={post.image}
            content={post.content}
            author={post.author}
          />
        ))}
      </Box>
    </Flex>
  );
}

export default AdminPagePostsContent;
