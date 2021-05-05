import initializeDatabase from "../database/initializer/database";
import { PitchDeck } from "../database/entities/PitchDeck";
import { PitchDeckImageFactory } from "../database/factories/PitchDeckImageFactory";
import { PitchDeckImage } from "database/entities/PitchDeckImage";
import { PitchDeckUpload } from "database/entities/PitchDeckUpload";

const create = async (
  filePaths: string[],
  pitchDeck: PitchDeck,
  upload: PitchDeckUpload
) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const result: PitchDeckImage[] = [];
  for (const filePath of filePaths) {
    const image = await PitchDeckImageFactory.create({
      filePath,
      pitchDeck,
      upload,
    });
    result.push(image);
  }

  // Close connection
  await connection.close();

  return result;
};

export const PichDeckImageService = {
  create,
};
