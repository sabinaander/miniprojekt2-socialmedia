import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import {
  Input,
  Stack,
  Button,
  Textarea,
  FormControl,
  Flex,
  Box,
  VStack,
} from '@chakra-ui/react'
import { addNewPost } from '../features/blogPosts/postsSlice'

function PostForm() {
  const {
    handleSubmit,
    register,
    // reset,
    formState: { isSubmitting },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    if (data) {
      dispatch(
        addNewPost({
          title: data.title,
          content: data.content,
          imageUrl: data.imageUrl,
        })
      )
    }
    // reset(data) // - not working, needs investigating
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
                  {...register('imageUrl')}
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
              Add post
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}

export default PostForm
