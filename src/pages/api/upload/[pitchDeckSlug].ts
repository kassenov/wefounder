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
    // Initialize connection
    const connection = await initializeDatabase();

    const { pitchDeckSlug } = req.query;
    const { path } = req.file;

    const pitchDeckPromise = getPitchDeck(pitchDeckSlug as string);
    const filePathsPromise = convert(path);
    const pitchDeck = await pitchDeckPromise;
    if (pitchDeck === undefined) {
      // Close connection
      await connection.close();

      res
        .status(404)
        .json({ error: `Pitch deck with slug '${pitchDeckSlug}' not found` });
    } else {
      const pitchDeckUpload = await createUploadRecord(path, pitchDeck);
      const filePaths = await filePathsPromise;
      const pitchDeckImages = await createImageRecords(filePaths, pitchDeck);

      // Close connection
      await connection.close();
      res.status(200).json({ data: "success" });
    }
  }
);

const createUploadRecord = async (filePath: string, pitchDeck: PitchDeck) => {
  return await PitchDeckUploadFactory.create({ filePath, pitchDeck });
};

const createImageRecords = async (
  filePaths: string[],
  pitchDeck: PitchDeck
) => {
  return await filePaths.map(async (filePath) => {
    return await PitchDeckImageFactory.create({ filePath, pitchDeck });
  });
};

const getPitchDeck = async (slug: string) => {
  const pitchDeckRepo = await getRepository(PitchDeck);
  return await pitchDeckRepo.findOne({ where: { slug } });
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
