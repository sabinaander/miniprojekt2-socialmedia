import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import SaveIcon from '@mui/icons-material/Save';
import { editPost } from '../features/blogPosts/postsSlice';

function AdminPostsAccordion(props) {
  const [edited, setEdited] = useState(props.post);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setEdited(props.post);
  }, [props.post]);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton bg="gray.300" _expanded={{ bg: 'grey.400' }}>
          <Box flex="1" textAlign="left">
            {edited.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <img width="100px" height="100px" src={edited.imageUrl} alt="" />
        <h3>Image URL:</h3>
        <input
          type="url"
          onChange={(e) => setEdited({ ...edited, imageUrl: e.target.value })}
          value={edited.imageUrl}
        ></input>
        <Box>
          <h3>Titel:</h3>
          <input
            onChange={(e) => setEdited({ ...edited, title: e.target.value })}
            type="text"
            value={edited.title}
          ></input>
        </Box>
        <Box>
          <h3>Text content</h3>
          <textarea
            onChange={(e) => setEdited({ ...edited, content: e.target.value })}
            value={edited.content}
          ></textarea>
        </Box>
        <Box>
          <ButtonGroup padding="0" variant="solid" spacing="1">
            <Button
              margin="0"
              rightIcon={<SaveIcon />}
              isDisabled={
                edited.imageUrl === props.post.imageUrl &&
                edited.title === props.post.title &&
                edited.content === props.post.content
              }
              onClick={() =>
                dispatch(
                  editPost({
                    id: props.post._id,
                    title: edited.title,
                    content: edited.content,
                    imageUrl: edited.imageUrl,
                  })
                )
              }
            >
              Save
            </Button>
            <Button onClick={onOpen}>Delete</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Are you sure you want to remove post?</ModalHeader>
                <ModalCloseButton />
                <ModalBody> Are you sure you want to remove post?</ModalBody>
                <ModalFooter>
                  <Button
                    margin="0"
                    rightIcon={<DeleteIcon />}
                    onClick={() => {
                      props.deletePost();
                      onClose();
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={onClose}>No</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ButtonGroup>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default AdminPostsAccordion;
