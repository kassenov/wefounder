import { CompanyFactory } from "../factories/CompanyFactory";
import { PitchDeckFactory } from "../factories/PitchDeckFactory";
import initializeDatabase from "../initializer/database";

const seed = async (): Promise<any> => {
    try {
        console.log('Seeding dummy data...');

        const company = await CompanyFactory.create({ slug: "company_1" });
        console.log('Company: ', company);

        const pitchDeck = await PitchDeckFactory.create({ slug: "pitch_deck_1", company: company });
        console.log('Pitch Deck: ', pitchDeck);

        console.log('Done seeding users.');

    } catch (e) {
        console.error('ERROR - Users: ', e);
    }
};

const run = async (): Promise<any> => {
    console.log('Connecting to DB');
    const connection = await initializeDatabase({ migrationsRun: false });

    console.log('Seeding DB');
    await seed();

    console.log('Closing DB');
    return await connection.close();
};

run();