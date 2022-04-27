import {
  Accordion,
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
import axios from 'axios';
import { useState } from 'react';

function AdminPostsAccordion(props) {
  const [edited, setEdited] = useState(props.post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Accordion allowToggle margin="0.5rem 0">
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
            <input
              onChange={(e) =>
                setEdited({ ...edited, content: e.target.value })
              }
              type="text"
              value={edited.content}
            ></input>
          </Box>
          <Box>
            <ButtonGroup padding="0" variant="solid" spacing="1">
              <Button
                margin="0"
                rightIcon={<SaveIcon />}
                onClick={() => {
                  axios
                    .put(
                      'http://localhost:5000/api/blogPosts/' + props.post._id,
                      {
                        title: edited.title,
                        content: edited.content,
                        imageUrl: edited.imageUrl,
                      },
                      { withCredentials: true }
                    )
                    .then((res) => console.log('Hej'));
                }}
              >
                Save
              </Button>
              <Button onClick={onOpen}>Delete</Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>
                    Are you sure you want to remove post?
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody> Are you sure you want to remove post?</ModalBody>
                  <ModalFooter>
                    <Button
                      margin="0"
                      rightIcon={<DeleteIcon />}
                      onClick={() =>
                        axios
                          .delete(
                            'http://localhost:5000/api/blogPosts/' +
                              props.post._id,
                            { withCredentials: true }
                          )
                          .then((res) => console.log(res.data))
                          .finally(() => onClose())
                      }
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
    </Accordion>
  );
}

export default AdminPostsAccordion;
