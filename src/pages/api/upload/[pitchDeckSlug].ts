import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import { ConvertAPI } from "convertapi";

import { getRepository } from "typeorm";
import initializeDatabase from "../../../database/initializer/database";
import { PitchDeck } from "../../../database/entities/PitchDeck";
import { PitchDeckUploadFactory } from "../../../database/factories/PitchDeckUploadFactory";
import { PitchDeckImageFactory } from "../../../database/factories/PitchDeckImageFactory";
import { v4 } from "uuid";
import { PitchDeckImage } from "database/entities/PitchDeckImage";

const FILE_UPLOAD_DESTINATION = "./public/uploads";
const CONVERTED_FILES_DESTINATION = "./public/converts";

const EXTENSION_REGEX = /(?:\.([^.]+))?$/;

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: FILE_UPLOAD_DESTINATION,
    filename: (req, file, cb) => {
      const matches = EXTENSION_REGEX.exec(file.originalname);

      let extension = "";
      if (matches !== null) {
        extension = matches[0];
      }

      const filename = `${v4()}${extension}`;
      cb(null, filename);
    },
  }),
});

const apiRoute = nextConnect({
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single("theFile");

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post(
  async (
    req: { query: { pitchDeckSlug: string }; file: { path: string } },
    res
  ) => {
    const { pitchDeckSlug } = req.query;
    const { path } = req.file;

    const pitchDeck = await getPitchDeck(pitchDeckSlug as string);
    if (pitchDeck === undefined) {
      res
        .status(404)
        .json({ error: `Pitch deck with slug '${pitchDeckSlug}' not found` });
    } else {
      const filePathsPromise = convert(path);
      const pitchDeckUpload = await createUploadRecord(path, pitchDeck);
      const filePaths = await filePathsPromise;
      const pitchDeckImages = await createImageRecords(filePaths, pitchDeck);

      res.status(200).json({ data: "success" });
    }
  }
);

const createUploadRecord = async (filePath: string, pitchDeck: PitchDeck) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const result = await PitchDeckUploadFactory.create({ filePath, pitchDeck });

  // Close connection
  await connection.close();

  return result;
};

const createImageRecords = async (
  filePaths: string[],
  pitchDeck: PitchDeck
) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const result: PitchDeckImage[] = [];
  for (const filePath of filePaths) {
    const image = await PitchDeckImageFactory.create({ filePath, pitchDeck });
    result.push(image);
  }

  // Close connection
  await connection.close();

  return result;
};

const getPitchDeck = async (slug: string) => {
  // Initialize connection
  const connection = await initializeDatabase();

  const pitchDeckRepo = await getRepository(PitchDeck);
  const result = await pitchDeckRepo.findOne({ where: { slug } });

  // Close connection
  await connection.close();

  return result;
};

const convert = async (filePath: string) => {
  const convertApi = new ConvertAPI(process.env.CONVERT_API_SECRET as string, {
    conversionTimeout: 60,
  });
  const result = await convertApi.convert("jpg", { File: filePath });
  const paths = new Array<string>();

  await result.files.forEach((file) => {
    const path = `${CONVERTED_FILES_DESTINATION}/${file.fileName}`;
    paths.push(path);
    file.save(path);
  });

  return paths;
};

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
