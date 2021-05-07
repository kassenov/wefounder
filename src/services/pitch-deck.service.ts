import { getRepository } from "typeorm";
import { PitchDeck } from "../database/entities/PitchDeck";

/**
 * Returns pitch deck by slug.
 * @param slug
 * @returns
 */
const getBySlug = async (slug: string) => {
  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.findOne({ where: { slug } });

  return result;
};

/**
 * Returns all pitch decks
 * @returns
 */
const getAll = async () => {
  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.find();

  return result;
};

export const PitchDeckService = {
  getBySlug,
  getAll,
};
