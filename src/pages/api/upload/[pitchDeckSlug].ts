import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import { ConvertAPI } from 'convertapi';

import { getRepository } from 'typeorm';
import initializeDatabase from '../../../database/initializer/database';
import { PitchDeck } from '../../../database/entities/PitchDeck';

const FILE_UPLOAD_DESTINATION = './public/uploads';
const CONVERTED_FILES_DESTINATION = './public/converted';

// Returns a Multer instance that provides several methods for generating 
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
    storage: multer.diskStorage({
        destination: FILE_UPLOAD_DESTINATION,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        // Handle any other HTTP method
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.single('theFile');

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post(async (req: { query: { pitchDeckSlug: string }, file: { path: string }}, res) => {
    const { pitchDeckSlug } = req.query;
    const { path } = req.file;

    // Initialize connection
    const connection = await initializeDatabase();

    const pitchDeckPromise = getPitchDeck(pitchDeckSlug as string);

    const convertPromise = convert(path);

    // Close connection
    await connection.close();

    res.status(200).json({ data: 'success' });
});

const getPitchDeck = async (slug: string) => {
    const pitchDeckRepo = await getRepository(PitchDeck);
    return await pitchDeckRepo.findOne({ where: { slug } });
}

const convert = async (filePath: string) => {
    const convertApi = new ConvertAPI(process.env.CONVERT_API_SECRET as string, { conversionTimeout: 60 });
    const result = await convertApi.convert('jpg', { File: filePath });

    await result.files.forEach(file => {
        file.save(`${CONVERTED_FILES_DESTINATION}/${file.fileName}`);
    });
}

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};