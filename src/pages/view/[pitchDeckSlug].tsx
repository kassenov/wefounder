import { Image } from "@chakra-ui/image";
import { Heading, List, ListItem, Text, VStack } from "@chakra-ui/layout";
import { getImagePathsByPitchDeckSlug, getPitchDeckStaticPaths } from "../../utils/pre-render.util";
import { withConnection } from "../../database/initializer/database";

// This function gets called at build time
export async function getStaticPaths() {
  return await withConnection(getPitchDeckStaticPaths)();
}

export async function getStaticProps({
  params,
}: {
  params: { pitchDeckSlug: string };
}) {
  const imagePaths = await withConnection(getImagePathsByPitchDeckSlug)(params.pitchDeckSlug);
  return {
    props: {
      imagePaths,
    },
  };
}

export default function ViewPage({ imagePaths }: { imagePaths: string[] }) {
  return (
    <VStack alignItems="left">
      <Heading as="h2">Name</Heading>
      <Text>Here should be a description.</Text>
      <Text align="justify">
        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in
        laying out print, graphic or web designs. The passage is attributed to
        an unknown typesetter in the 15th century who is thought to have
        scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a
        type specimen book.
      </Text>
      <List spacing={3}>
        {imagePaths.map((path) => (
          <ListItem key={path}>
            <Image
              src={path}
              allbackSrc="https://via.placeholder.com/650"
              alt={`Pitch Deck Image`}
            />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}
