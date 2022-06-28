import { DataSource } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['dist/entities/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

const run = async () => {
  await connectionSource.initialize();
};

run();

console.log('dist' + '/entities/*entity.{js,ts}');
