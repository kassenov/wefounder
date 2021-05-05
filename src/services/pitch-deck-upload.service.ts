import initializeDatabase from "../database/initializer/database";
import { PitchDeck } from "../database/entities/PitchDeck";
import { PitchDeckUploadFactory } from "../database/factories/PitchDeckUploadFactory";

const create = async (filePath: string, pitchDeck: PitchDeck) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const result = await PitchDeckUploadFactory.create({ filePath, pitchDeck });

  // Close connection
  await connection.close();

  return result;
};

export const PitchDeckUploadService = {
  create,
};
