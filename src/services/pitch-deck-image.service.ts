import { PitchDeck } from "../database/entities/PitchDeck";
import { PitchDeckImageFactory } from "../database/factories/PitchDeckImageFactory";
import { PitchDeckImage } from "../database/entities/PitchDeckImage";
import { PitchDeckUpload } from "../database/entities/PitchDeckUpload";
import { getRepository } from "typeorm";

/**
 * Creates a record in datase.
 *
 * @param filePaths
 * @param pitchDeck
 * @param upload
 * @returns
 */
const create = async (
  filePaths: string[],
  pitchDeck: PitchDeck,
  upload: PitchDeckUpload
) => {
  const result: PitchDeckImage[] = [];
  for (const filePath of filePaths) {
    const image = await PitchDeckImageFactory.create({
      filePath,
      pitchDeck,
      upload,
    });
    result.push(image);
  }

  return result;
};

/**
 * Returns all latest images given pitch deck slug.
 * @param slug
 * @returns
 */
const getAllLatestByPithDeckSlug = async (slug: string) => {
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

  return result;
};

/**
 * Returns true if a pitch deck has images
 * @param slug
 * @returns
 */
const anyByPithDeckSlug = async (slug: string) => {
  const qb = await getRepository(PitchDeckImage).createQueryBuilder(
    "pitch_deck_image"
  );

  const result = await qb
    .innerJoin("pitch_deck_image.pitchDeck", "pitchDeck")
    .where("pitchDeck.slug= :slug", { slug })
    .limit(1)
    .getCount();

  return result > 0;
};

export const PichDeckImageService = {
  create,
  getAllLatestByPithDeckSlug,
  anyByPithDeckSlug,
};
