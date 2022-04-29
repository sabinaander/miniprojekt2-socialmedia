import {
  Box,
  Button,
  Image,
  Link,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { parseISO, formatDistanceToNow, format } from 'date-fns';
import { useDispatch, useStore } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { useState } from 'react';
import {
  likePost,
  deletePost,
} from '../features/blogPosts/postsSlice';
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer';
import PostForm from './PostForm';

function PostCard({ post }) {
  const store = useStore(loginauthreducer);
  const state = store.getState();
  const [user, setUser] = useState(state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  store.subscribe(() => {
    setUser(store.getState().auth.user);
  });

  let timeAgo = '';
  const date = parseISO(post.createdAt);
  const timePeriod = formatDistanceToNow(date);
  timeAgo = `${timePeriod} ago`;

  const dispatch = useDispatch();

  const postData = {
    id: post._id,
    title: post.title,
    content: post.content,
    imgUrl: post.imageUrl,
  };

  const onDelete = () => {
    dispatch(deletePost(post._id));
    onClose();
  };
  const onlike = () => {
    dispatch(likePost(post._id));
  };

  return (
    <Box
      key={post._id}
      maxW="sm"
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        h="20rem"
        objectFit="cover"
        width="100%"
        src={post.imageUrl}
        alt={post.imageAlt}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Link as={ReactLink} to={`/profile/${post.author}`}>
              {post.author}
            </Link>{' '}
            &bull;{' '}
            <Tooltip label={format(date, 'dd/MM/yyyy HH:mm')}>
              {timeAgo}
            </Tooltip>
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {post.title}
        </Box>

        <Box>
          {post.content}
          <Box as="span" color="gray.600" fontSize="sm"></Box>
        </Box>

        <Box
          display="flex"
          mt="2"
          alignItems="center"
          as="button"
          onClick={onlike}
        >
          <FavoriteIcon fontSize="medium" color="action" />
          <Box ml="2" fontSize="sm">
            {post.likes} likes
          </Box>
        </Box>

        {/* <Box
          as="button"
          borderRadius="md"
          bg="black"
          color="white"
          px={4}
          h={8}
        >
          Comment
        </Box> */}

        {post.author === user?.username && (
          <>
            <Button onClick={onOpen} bg="blue" color="white" px={4} h={8}>
              Edit/Delete
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit or Delete Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <PostForm onClose={onClose} postData={postData} />
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="ghost" bg="red.500" onClick={onDelete}>
                    Delete Post
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PostCard;
