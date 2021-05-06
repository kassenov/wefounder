import { Center, Stack, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Stack w="100%" p={0}>
      <Center as={Text} variant="1" fontSize="sm" color="gray.600" pb={1}>
        Uploading file...
      </Center>
      <Progress value={progress} size="sm" />
    </Stack>
  );
};

export default ProgressBar;
