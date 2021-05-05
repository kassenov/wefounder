import { useRouter } from "next/router";

const ViewPage = () => {
  const router = useRouter();
  const { pitchDeckSlug } = router.query;

  return <>Text</>;
};

export default ViewPage;
