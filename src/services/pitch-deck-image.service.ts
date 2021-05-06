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

const getAllLatestByPithDeckSlug = async (slug: string) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const qb = await getRepository(PitchDeckImage).createQueryBuilder(
    "pitch_deck_image"
  );

  const result = await qb
    .innerJoin("pitch_deck_image.pitchDeck", "pitchDeck")
    .innerJoin("pitch_deck_image.upload", "upload")
    .where("pitchDeck.slug= :slug", { slug })
    .andWhere(
      "upload.id IN " +
        qb
          .subQuery()
          .select("pitchDeckUpload.id")
          .from(PitchDeckUpload, "pitchDeckUpload")
          .orderBy("pitchDeckUpload.created_at", "DESC")
          .limit(1)
          .getQuery()
    )
    .getMany();

  // Close connection
  await connection.close();

  return result;
};

export const PichDeckImageService = {
  create,
  getAllLatestByPithDeckSlug,
};
