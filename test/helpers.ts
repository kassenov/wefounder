import initializeDatabase from '../src/database/initializer/database';
import { getConnection } from 'typeorm';

export const resetDB = async (): Promise<void> => {
  const connection = await getConnection();

  await connection.dropDatabase();
  await connection.synchronize();
};

export const connectDB = async (): Promise<void> => {
  await initializeDatabase({
    synchronize: false,
    migrationsRun: false,
    logging: false
  });

  await resetDB();
};

export const closeDB = async (): Promise<void> => {
  const connection = await getConnection();
  await connection.close();
};