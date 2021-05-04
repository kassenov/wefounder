import { Flex, Link, Text, Box, Heading } from "@chakra-ui/layout";
import Image from "next/image";

import SomeImage from "components/SomeImage";
import CTASection from "components/CTASection";
import { useColorMode } from "@chakra-ui/color-mode";

import MotionBox from "../components/motion/Box";

const IntroText = () => {
  return (
    <>
      <Heading as="h2" fontSize="3xl">
        Hello there!
        </Heading>

      <Box
        py={4}
        borderRadius={4}
      >
        <Box d="flex" alignItems="center" fontSize="sm">
          This is a demo project where you can see a pitch deck with images from a founder's presentation uploaded as a PPT or PDF.
          It supports other types of files, however I haven't tested them out.
          <br />

        </Box>
      </Box>
    </>
  )
}

const IntroImage = () => {
  return (
    <>
      <MotionBox
        animate={{ y: 20, scale: 0.97 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        marginY={8}
        maxWidth={[280, 400]}
        marginX="auto"
      >
        <Image
          src="/Launching-amico.svg"
          width={400}
          height={400}
          alt="Launching Illustration"
        />
      </MotionBox>
      <Text textAlign="center" fontSize="xs">
        <Link href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </Link>
      </Text>
    </>
  );
}

const Home = () => {
  const { colorMode } = useColorMode();

  return (
    <Box mb={8} w="full">
      <IntroText />
      <IntroImage />
      <CTASection />
    </Box>
  );
};

export default Home;
