import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Box, Center, HStack, Link, Text, VStack } from "@chakra-ui/layout";
import { DownloadIcon } from "@chakra-ui/icons";
import ProgressBar from "components/upload-page/ProgressBar";
import { Spinner } from "@chakra-ui/spinner";
import { getPitchDeckStaticPaths } from "../../utils/pre-render.util";
import { withConnection } from "../../database/initializer/database";
import { PichDeckImageService } from "../../services/pitch-deck-image.service";

// This function gets called at build time
export async function getStaticPaths() {
  return await withConnection(getPitchDeckStaticPaths)();
}

export async function getStaticProps({
  params,
}: {
  params: { pitchDeckSlug: string };
}) {
  const conversionExists = await withConnection(
    PichDeckImageService.anyByPithDeckSlug
  )(params.pitchDeckSlug);
  return {
    props: {
      conversionExists,
    },
  };
}

enum State {
  INITIAL,
  UPLOADING,
  CONVERTING,
  FINISHED,
}

const UploadPage = ({ conversionExists }: { conversionExists: boolean }) => {
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

  useEffect(() => {
    if (state === State.UPLOADING) {
      window.onbeforeunload = function () {
        return "Please wait until the upload and preparation is done.";
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [state]);

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
    if (dropzoneState.isDragActive) {
      return "blue.100";
    }
  };

  let color = "";
  let message = "";
  switch (state) {
    case State.UPLOADING:
      color = "blue.500";
      message = "We are uploading!";
      break;
    case State.CONVERTING:
      color = "green.500";
      message = "Building the pitch deck, might take a while!";
      break;
    case State.FINISHED:
      color = "";
      message = "Congrats! You are set now!";
      break;
    default:
      color = "";
      message =
        "Here you can upload your presentation to be added to the pitch deck.";
  }

  const shouldShowSpinner = state !== State.INITIAL && state !== State.FINISHED;

  return (
    <VStack spacing={8} my={20}>
      {conversionExists ? (
        <Box bg="tomato" w="100%" p={4} color="white" borderRadius="md">
          It seems that you already have uploaded your pitch deck. Visit{" "}
          <Link href="/view/pitch_deck_1">this page</Link> to see it.
        </Box>
      ) : (
        ""
      )}
      <HStack>
        {shouldShowSpinner ? <Spinner color={color} /> : <></>}
        <Text>{message}</Text>
        {state === State.FINISHED ? (
          <Link href="/view/pitch_deck_1">See the page.</Link>
        ) : (
          <></>
        )}
      </HStack>
      <div {...dropzoneState.getRootProps({ className: "dropzone" })}>
        <Box
          bg="gray.100"
          p={4}
          borderRadius="md"
          cursor="pointer"
          bgColor={getHighlightColor()}
          w="500px"
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
