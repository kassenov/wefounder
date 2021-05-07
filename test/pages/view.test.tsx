import { closeDB, connectDB, resetDB } from '../helpers';
import ViewPage from '../../src/pages/view/[pitchDeckSlug]'
import { CompanyFactory } from '../../src/database/factories/CompanyFactory';
import { PitchDeckFactory } from '../../src/database/factories/PitchDeckFactory';
import { PitchDeckUploadFactory } from '../../src/database/factories/PitchDeckUploadFactory';
import { PitchDeckUpload } from '../../src/database/entities/PitchDeckUpload';
import { PitchDeckImageFactory } from '../../src/database/factories/PitchDeckImageFactory';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';;

describe("View Page", () => {
    beforeAll(async done => {
        await connectDB();
        done();
    });

    beforeEach(async done => {
        await resetDB();
        done();
    });

    afterAll(async done => {
        await closeDB();
        done();
    });

    const createUploadRecord = async () => {
        const company = await CompanyFactory.create({ slug: 'company_1' });
        const pitchDeck = await PitchDeckFactory.create({ slug: 'deck_1', company });

        return await PitchDeckUploadFactory.create({ filePath: 'a path', pitchDeck });
    }

    const createImageRecord = async (upload: PitchDeckUpload) => {
        return await PitchDeckImageFactory.create({ filePath: 'a path', pitchDeck: upload.pitchDeck, upload });
    }

    it("should retrieve images and render", async () => {
        // const upload = await createUploadRecord();
        // const images = [await createImageRecord(upload), await createImageRecord(upload)];
        
        render(<ViewPage imagePaths={['1', '2']}/>);

        screen.getAllByAltText("Pitch Deck Image")
            .forEach(image => {
                expect(image).toBeInTheDocument();
            });
    });
});