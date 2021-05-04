
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { useRouter } from "next/router";
import multer from 'multer';

const router = useRouter()
const { pitchDeckSlug } = router.query

// Returns a Multer instance that provides several methods for generating 
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
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
apiRoute.post((req, res) => { 
    res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};