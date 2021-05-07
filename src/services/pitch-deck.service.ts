import { getRepository } from "typeorm";
import { PitchDeck } from "../database/entities/PitchDeck";

const getBySlug = async (slug: string) => {
  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.findOne({ where: { slug } });

  return result;
};

// TODO This should be refactored
const getAll = async () => {
  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.find();

  return result;
};

export const PitchDeckService = {
  getBySlug,
  getAll,
};
