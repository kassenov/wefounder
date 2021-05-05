import { getRepository } from "typeorm";
import { PitchDeckImage } from "database/entities/PitchDeckImage";

export const PitchDeckImageFactory = {
  build: (attrs: Partial<PitchDeckImage> = {}) => {
    const deckImageAttrs: Partial<PitchDeckImage> = {
      ...attrs,
    };

    return getRepository(PitchDeckImage).create(deckImageAttrs);
  },

  create: async (attrs: Partial<PitchDeckImage> = {}) => {
    const pitchDeckImage = PitchDeckImageFactory.build(attrs);
    const createdPitchImageDeck = await getRepository(PitchDeckImage).save(
      pitchDeckImage
    );

    return createdPitchImageDeck;
  },
};
