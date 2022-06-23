import { DataSource } from 'typeorm';
import { join } from 'path';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'test',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [join('dist', '**', '*.entity.{ts,js}')],
  migrations: [join('dist', 'migrations', '*.{ts,js}')],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

const run = async () => {
  await connectionSource.initialize();
};

run();
