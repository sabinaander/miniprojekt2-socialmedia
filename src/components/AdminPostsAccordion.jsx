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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useState } from 'react';

function AdminPostsAccordion(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Accordion allowToggle margin="0.5rem 0">
      <AccordionItem>
        <h2>
          <AccordionButton bg="gray.300" _expanded={{ bg: 'grey.400' }}>
            <Box flex="1" textAlign="left">
              {props.post.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <img src={props.post.imageUrl} alt="" />
          <Box>Created by: {props.post.author}</Box>
          <input type="text" value={props.post.content}></input>
          <Box>
            <Button
              rightIcon={<DeleteIcon />}
              onClick={() =>
                axios
                  .delete(
                    'http://localhost:5000/api/blogPosts/' + props.post._id
                  )
                  .then((res) => console.log(res.data))
              }
            >
              Delete
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default AdminPostsAccordion;

/* <Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>; */
