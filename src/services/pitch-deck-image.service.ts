import initializeDatabase from "../database/initializer/database";
import { PitchDeck } from "../database/entities/PitchDeck";
import { PitchDeckImageFactory } from "../database/factories/PitchDeckImageFactory";
import { PitchDeckImage } from "database/entities/PitchDeckImage";
import { PitchDeckUpload } from "database/entities/PitchDeckUpload";
import { getRepository } from "typeorm";

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

const getAllByPithDeckSlug = async (slug: string) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const imageRepo = await getRepository(PitchDeckImage);
  const result = await imageRepo
    .createQueryBuilder("pitch_deck_image")
    .innerJoin("pitch_deck_image.pitchDeck", "pitchDeck")
    .where("pitchDeck.slug= :slug", { slug })
    .getMany();

  // Close connection
  await connection.close();

  return result;
};

export const PichDeckImageService = {
  create,
  getAllByPithDeckSlug
};
