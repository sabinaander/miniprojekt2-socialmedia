import { Box, Image, Link, Tooltip } from '@chakra-ui/react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { parseISO, formatDistanceToNow, format } from 'date-fns'
import { Link as ReactLink } from 'react-router-dom'

function PostCard({ post }) {
  let timeAgo = ''
  const date = parseISO(post.createdAt)
  const timePeriod = formatDistanceToNow(date)
  timeAgo = `${timePeriod} ago`

  return (
    <Box
      key={post._id}
      maxW="sm"
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={post.imageUrl} alt={post.imageAlt} />

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

        <Box display="flex" mt="2" alignItems="center">
          <FavoriteIcon fontSize="medium" color="action" />
          <Box as="span" ml="2" fontSize="sm">
            {post.likes} likes
          </Box>
        </Box>

        <Box
          as="button"
          borderRadius="md"
          bg="black"
          color="white"
          px={4}
          h={8}
        >
          Comment
        </Box>
      </Box>
    </Box>
  )
}

export default PostCard
