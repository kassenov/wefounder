import { Company } from "../entities/Company";
import { PitchDeck } from "../entities/PitchDeck";
import { PitchDeckImage } from "../entities/PitchDeckImage";
import { PitchDeckUpload } from "../entities/PitchDeckUpload";
import "reflect-metadata";
import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const initializeDatabase = async (
  optionOverrides: Record<string, any> = {}
): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    entities: [Company, PitchDeck, PitchDeckUpload, PitchDeckImage],
    migrations: [__dirname + "/../migrations/*.ts"],
    ...optionOverrides,
  };

  const connection = await createConnection(options);

  return connection;
};

/**
 * Wraps a function by initializing and closing databse connection.
 * @param fn
 * @returns
 */
export const withConnection = <T extends Array<any>, U>(
  fn: (...args: T) => Promise<U>
) => {
  return async (...args: T) => {
    const connection = await initializeDatabase();
    const result = await fn(...args);
    await connection.close();

    return result;
  };
};

export default initializeDatabase;
