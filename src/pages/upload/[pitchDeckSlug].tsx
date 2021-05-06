import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Box, Center, Stack, Text } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { DownloadIcon } from '@chakra-ui/icons';

const UploadPage = () => {
  const router = useRouter();
  const { pitchDeckSlug } = router.query;

  const [progress, setProgress] = useState<number | undefined>(undefined);

  const config = {
    headers: { "content-type": "multipart/form-data" },
    onUploadProgress: (event: ProgressEvent) => {
      const progress = Math.round((event.loaded * 100) / event.total);
      setProgress(progress)
    },
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append("theFile", file);

    return await axios.post(
      `/api/upload/${pitchDeckSlug}`,
      formData,
      config
    );
  }, [pitchDeckSlug]);

  const dropzoneState = useDropzone({
    onDrop,
    accept: '.ppt, .pptx, .pdf', // We can accpet other files but limit it for the sake of the exercise
  });

  const getHighlightColor = () => {
    if (dropzoneState.isDragAccept) {
      return 'blue.100';
    }
    if (dropzoneState.isDragReject) {
      return 'red.200';
    }
    if (dropzoneState.isDragActive) {
      return 'blue.100';
    }
  };

  return (
    <div {...dropzoneState.getRootProps({ className: 'dropzone' })}>
      <Box bg="gray.100" p={4} borderRadius="md" cursor="pointer" bgColor={getHighlightColor()}>
        {progress === undefined ? (
          <Center w="100%" p={2}>
            <input aria-label="file-upload" {...dropzoneState.getInputProps()} />
            <Box fontWeight="bold">
              <DownloadIcon color="gray.600" mr="2" />
              Upload File Attachment
            </Box>
          </Center>
        ) : (
          <Stack w="100%" p={0}>
            <Center as={Text} variant="1" fontSize="sm" color="gray.600" pb={1}>
              Uploading file...
            </Center>
            <Progress value={progress} size="sm" />
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default UploadPage;
