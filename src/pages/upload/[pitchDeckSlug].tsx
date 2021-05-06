import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Box, Center, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { DownloadIcon } from "@chakra-ui/icons";
import ProgressBar from "components/upload-page/ProgressBar";
import { Spinner } from "@chakra-ui/spinner";

enum State {
  INITIAL,
  UPLOADING,
  CONVERTING,
  FINISHED,
}

const UploadPage = () => {
  const router = useRouter();
  const { pitchDeckSlug } = router.query;

  const [progress, setProgress] = useState<number>(0);

  const [state, setState] = useState<State>(State.INITIAL);

  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event: ProgressEvent) => {
      setState(State.UPLOADING);

      const progress = Math.round((event.loaded * 100) / event.total);
      setProgress(progress);

      if (progress === 100) {
        setState(State.CONVERTING);
      }
    },
  };

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("theFile", file);

      await axios.post(`/api/upload/${pitchDeckSlug}`, formData, config);

      setState(State.FINISHED);
    },
    [pitchDeckSlug]
  );

  const dropzoneState = useDropzone({
    onDrop,
    accept: ".ppt, .pptx, .pdf", // We can accpet other files but limit it for the sake of the exercise
  });

  const getHighlightColor = () => {
    if (dropzoneState.isDragAccept) {
      return "blue.100";
    }
    if (dropzoneState.isDragReject) {
      return "red.200";
    }
    if (dropzoneState.isDragActive) {
      return "blue.100";
    }
  };

  let color = "";
  let message = "";
  switch (state) {
    case State.UPLOADING:
      color = "red.500";
      message = "We are uploading!";
      break;
    case State.CONVERTING:
      color = "blue.500";
      message = "Building the pitch deck, might take a while!";
      break;
    case State.FINISHED:
      color = "green.500";
      message = "All done!!!";
      break;
    default:
      color = "";
      message =
        "Here you can upload your presentation to be added to the pitch deck.";
  }

  return (
    <VStack spacing={8} my={20}>
      <HStack>
        {state !== State.INITIAL ? <Spinner color={color} /> : <></>}
        <Text>{message}</Text>
      </HStack>
      <div {...dropzoneState.getRootProps({ className: "dropzone" })}>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          cursor="pointer"
          bgColor={getHighlightColor()}
        >
          {" "}
          {state === State.INITIAL ? (
            <Center w="100%" p={2}>
              <input
                aria-label="file-upload"
                {...dropzoneState.getInputProps()}
              />
              <Box fontWeight="bold">
                <DownloadIcon color="gray.600" mr="2" />
                Upload File Attachment
              </Box>
            </Center>
          ) : (
            <ProgressBar progress={progress} />
          )}
        </Box>
      </div>
    </VStack>
  );
};

export default UploadPage;
