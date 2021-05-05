import { PitchDeck } from "../entities/PitchDeck";
import { getRepository } from "typeorm";

export const PitchDeckFactory = {
  build: (attrs: Partial<PitchDeck> = {}) => {
    const deckAttrs: Partial<PitchDeck> = {
      ...attrs,
    };

    return getRepository(PitchDeck).create(deckAttrs);
  },

  create: async (attrs: Partial<PitchDeck> = {}) => {
    const pitchDeck = PitchDeckFactory.build(attrs);
    const createdPitchDeck = await getRepository(PitchDeck).save(pitchDeck);

    return createdPitchDeck;
  },
};
