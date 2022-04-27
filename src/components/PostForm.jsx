import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useStore } from 'react-redux'
import {
  Input,
  Stack,
  Button,
  Textarea,
  FormControl,
  Flex,
  Box,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { addNewPost, editPost } from '../features/blogPosts/postsSlice'
import loginauthreducer from '../features/login-auth/reducers/loginauthreducer'

function PostForm({ onClose, postData }) {
  const store = useStore(loginauthreducer)
  const state = store.getState()
  const [isLoggedIn, setIsLoggedIn] = useState(state.auth.isLoggedIn)
  const [user, setUser] = useState(state.auth.user)

  store.subscribe(() => {
    setIsLoggedIn(store.getState().auth.isLoggedIn)
    setUser(store.getState().auth.user)
  })
  const {
    handleSubmit,
    register,
    // reset,
    formState: { isSubmitting },
  } = useForm()

  const dispatch = useDispatch()
  const toast = useToast()

  const onSubmit = (data) => {
    try {
      if (data && isLoggedIn && !postData) {
        dispatch(
          addNewPost({
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
            author: user.username,
          })
        )
        onClose()
        toast({
          title: 'Submitted!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } else {
        dispatch(
          editPost({
            id: postData.id,
            title: data.title,
            content: data.content,
            imageUrl: data.imageUrl,
          })
        )
        onClose()
      }
      // reset(data) // - not working, needs investigating
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Flex align="center" justify="center">
      <Box bg="white" p={6} rounded="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <Stack>
                <Input
                  id="title"
                  placeholder="image url"
                  type="text"
                  size="lg"
                  variant="filled"
                  errorBorderColor="red.300"
                  {...register('imageUrl', {
                    value: postData?.imgUrl,
                  })}
                />
                <Input
                  id="title"
                  placeholder="Title"
                  type="text"
                  size="lg"
                  variant="filled"
                  errorBorderColor="red.300"
                  {...register('title', {
                    required: 'This is required',
                    value: postData?.title,
                  })}
                />
                <Textarea
                  id="content"
                  placeholder="Whats on your mind..."
                  type="text"
                  variant="filled"
                  errorBorderColor="red.300"
                  {...register('content', {
                    required: 'This is required',
                    value: postData?.content,
                  })}
                />
              </Stack>
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="purple"
              isFullWidth
            >
              {postData ? 'Update post' : 'Add post'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}

export default PostForm
