import { UiFileInputButton } from "components/UiFileInputButton";
import axios from "axios";
import { useRouter } from "next/router";

const UploadPage = () => {
  const router = useRouter();
  const { pitchDeckSlug } = router.query;

  const onChange = async (formData: FormData) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };

    const response = await axios.post(
      `/api/upload/${pitchDeckSlug}`,
      formData,
      config
    );

    console.log("response", response.data);
  };

  return (
    <UiFileInputButton
      label="Upload Single File"
      uploadFileName="theFile"
      onChange={onChange}
    />
  );
};

export default UploadPage;
