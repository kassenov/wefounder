import { closeDB, connectDB, resetDB } from '../helpers';
import ViewPage, { getStaticPaths } from '../../src/pages/view/[pitchDeckSlug]'
import { CompanyFactory } from '../../src/database/factories/CompanyFactory';
import { PitchDeckFactory } from '../../src/database/factories/PitchDeckFactory';
import { PitchDeckUploadFactory } from '../../src/database/factories/PitchDeckUploadFactory';
import { PitchDeckUpload } from '../../src/database/entities/PitchDeckUpload';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';;

describe("View Page", () => {

    it("should retrieve images and render", async () => {
        render(<ViewPage imagePaths={['1', '2']} />);

        screen.getAllByAltText("Pitch Deck Image")
            .forEach(image => {
                expect(image).toBeInTheDocument();
            });
    });

});

describe("Pre-rendering", () => {

    let upload: PitchDeckUpload;

    beforeEach(async done => {
        await connectDB();
        await resetDB();

        const company = await CompanyFactory.create({ slug: 'company_1' });
        const pitchDeck = await PitchDeckFactory.create({ slug: 'deck_1', company });

        upload = await PitchDeckUploadFactory.create({ filePath: 'a path', pitchDeck });

        await closeDB();

        done();
    });

    it("should retrieve paths", async () => {

        const staticPaths = await getStaticPaths();

        expect(staticPaths).toStrictEqual({
            paths: [{
                params: {
                    pitchDeckSlug: upload.pitchDeck.slug,
                },
            }], fallback: false
        });

    });
});