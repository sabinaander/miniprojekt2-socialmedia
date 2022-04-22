import {
  Flex,
  Heading,
  Avatar,
  Container,
  Spacer,
} from "@chakra-ui/react";

function ProfileHeader() {
  return (
    <Container maxW="100%" padding={0}>
      <Container
        maxW="100%"
        height="30vh"
        padding={2}
        backgroundImage="url(https://images-1.wuaki.tv/system/shots/196372/original/snapshot-1590665218.jpeg)"
      >
        <Avatar
          size="xl"
          name="America, fuck yeaa!"
          src="https://static.feber.se/article_images/50/72/03/507203_1280.jpg"
        />
        <Flex>
          {/* username */}
          <Heading as="h1" size="2xl" color="white">
            Capt'n
          </Heading>

          <Spacer />
        </Flex>
      </Container>
    </Container>
  );
}

export default ProfileHeader;
