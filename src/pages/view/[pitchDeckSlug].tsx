import { Image } from "@chakra-ui/image";
import { List, ListItem } from "@chakra-ui/layout";
import { PichDeckImageService } from "services/pitch-deck-image.service";
import { PitchDeckService } from "services/pitch-deck.service";

const LENGTH_TO_REMOVE = "./public".length;

// This function gets called at build time
export async function getStaticPaths() {
  const pitchDecks = await PitchDeckService.getAll();

  // Get the paths we want to pre-render based on posts
  const paths = pitchDecks.map((pitchDeck) => ({
    params: { pitchDeckSlug: pitchDeck.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { pitchDeckSlug: string };
}) {
  const pitchDeckImages = await PichDeckImageService.getAllLatestByPithDeckSlug(
    params.pitchDeckSlug
  );
  const imagePaths = pitchDeckImages.map((image) =>
    image.filePath.slice(LENGTH_TO_REMOVE)
  );
  return {
    props: {
      imagePaths,
    },
  };
}

export default function ViewPage({ imagePaths }: { imagePaths: string[] }) {
  return (
    <List spacing={3}>
      {imagePaths.map((path) => (
        <ListItem key={path}>
          <Image src={path} allbackSrc="https://via.placeholder.com/650" />
        </ListItem>
      ))}
    </List>
  );
}
