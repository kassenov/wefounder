import { PichDeckImageService } from "../services/pitch-deck-image.service";
import { PitchDeckService } from "../services/pitch-deck.service";

const LENGTH_TO_REMOVE = "./public".length;

export async function getPitchDeckStaticPaths() {
    const pitchDecks = await PitchDeckService.getAll();

    const paths = pitchDecks.map((pitchDeck) => ({
        params: { pitchDeckSlug: pitchDeck.slug },
    }));

    return { paths, fallback: false };
}

export async function getImagePathsByPitchDeckSlug(slug: string) {
    const pitchDeckImages = await PichDeckImageService.getAllLatestByPithDeckSlug(slug);

    return pitchDeckImages.map((image) =>
        image.filePath.slice(LENGTH_TO_REMOVE)
    );
}