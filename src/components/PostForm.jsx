import { useForm } from "react-hook-form";
import { Input, Stack, Button,Textarea, FormControl, Flex, Box, VStack } from "@chakra-ui/react";

function PostForm() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  function onSubmit() {
    // hurr hurr
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
                  placeholder="Title"
                  type="text"
                  size="lg"
                  variant="filled"   
                  errorBorderColor="red.300"
                />
                <Textarea
                  id="content"
                  placeholder="Whats on your mind..."
                  type="text"
                  variant="filled"
                  errorBorderColor="red.300"
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
  );
}

export default PostForm;
