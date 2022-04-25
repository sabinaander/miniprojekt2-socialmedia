import {
  Flex,
  Heading,
  Avatar,
  Container,
  Spacer,
} from "@chakra-ui/react";

function ProfileHeader(props) {

  return (
    props.user &&
    <Container maxW="100%" padding={0}>
      <Container
        maxW="100%"
        height="30vh"
        padding={2}
        backgroundImage={props.user.backgroundImage}
      >
        <Avatar
          size="xl"
          name={props.user.username}
          src={props.user.avatar}
        />
        <Flex>
          
          <Heading as="h1" size="2xl" color="white">
            {props.user.username}
          </Heading>

          <Spacer />
        </Flex>
      </Container>
    </Container>
  );
}

export default ProfileHeader;
