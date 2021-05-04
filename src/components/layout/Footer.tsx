import { Flex, Link, Text } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        Zharkyn Kassenov
      </Text>
    </Flex>
  );
};

export default Footer;
