import { getRepository } from "typeorm";
import initializeDatabase from "../database/initializer/database";
import { PitchDeck } from "../database/entities/PitchDeck";

const getBySlug = async (slug: string) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.findOne({ where: { slug } });

  // Close connection
  await connection.close();

  return result;
};

// TODO This should be refactored
const getAll = async () => {
  // Initialize connection
  const connection = await initializeDatabase();

  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.find();

  // Close connection
  await connection.close();

  return result;
};

export const PitchDeckService = {
  getBySlug,
  getAll,
};
