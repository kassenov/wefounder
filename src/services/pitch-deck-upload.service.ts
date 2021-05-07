import { PitchDeck } from "../database/entities/PitchDeck";
import { PitchDeckUploadFactory } from "../database/factories/PitchDeckUploadFactory";

const create = async (filePath: string, pitchDeck: PitchDeck) => {
  const result = await PitchDeckUploadFactory.create({ filePath, pitchDeck });

  return result;
};

export const PitchDeckUploadService = {
  create,
};
