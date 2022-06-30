import { DataSource } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  // host: 'localhost',
  // port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  // host: '/cloudsql/fs-henry-nestjs-exercise-2022:us-central1:test123',
  extra: {
    socketPath: '/cloudsql/fs-henry-nestjs-exercise-2022:us-central1:test123',
  },
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,

  entities: ['dist/entities/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

const run = async () => {
  await connectionSource.initialize();
};

run();

console.log('dist' + '/entities/*entity.{js,ts}');
