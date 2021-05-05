import { getRepository } from "typeorm";
import { PitchDeckUpload } from "database/entities/PitchDeckUpload";

export const PitchDeckUploadFactory = {
  build: (attrs: Partial<PitchDeckUpload> = {}) => {
    const deckUploadAttrs: Partial<PitchDeckUpload> = {
      ...attrs,
    };

    return getRepository(PitchDeckUpload).create(deckUploadAttrs);
  },

  create: async (attrs: Partial<PitchDeckUpload> = {}) => {
    const pitchDeckUpload = PitchDeckUploadFactory.build(attrs);
    const createdPitchUploadDeck = await getRepository(PitchDeckUpload).save(
      pitchDeckUpload
    );

    return createdPitchUploadDeck;
  },
};
