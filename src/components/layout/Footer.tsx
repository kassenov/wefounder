import { Flex, Link, Text } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        Zharkyn Kassenov based on {" "}
        <Link href="https://github.com/sozonome/nextchakra-starter" isExternal>
          nextchakra-starter
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
