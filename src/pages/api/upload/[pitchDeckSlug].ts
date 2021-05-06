import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import { v4 } from "uuid";
import { PitchDeckService } from "services/pitch-deck.service";
import { ConversionService } from "services/conversion.service";
import { PitchDeckUploadService } from "services/pitch-deck-upload.service";
import { PichDeckImageService } from "services/pitch-deck-image.service";

export const FILE_UPLOAD_DESTINATION = "./public/uploads";
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

    const pitchDeck = await PitchDeckService.getBySlug(pitchDeckSlug as string);
    if (pitchDeck === undefined) {
      res
        .status(404)
        .json({ error: `Pitch deck with slug '${pitchDeckSlug}' not found` });
    } else {
      // const filePathsPromise = ConversionService.convertByFilePath(path);
      const pitchDeckUpload = await PitchDeckUploadService.create(
        path,
        pitchDeck
      );
      // const filePaths = await filePathsPromise;
      // const pitchDeckImages = await PichDeckImageService.create(
      //   filePaths,
      //   pitchDeck,
      //   pitchDeckUpload
      // );

      res.status(200).json({ data: "success" });
    }
  }
);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
