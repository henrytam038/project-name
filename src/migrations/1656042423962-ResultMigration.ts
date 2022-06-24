import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResultMigration1656042423962 implements MigrationInterface {
  name = 'ResultMigration1656042423962';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`test\``);
    await queryRunner.query(
      `ALTER TABLE \`market_dates\` ADD \`test\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`market_dates\` DROP COLUMN \`test\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`result\` ADD \`test\` varchar(255) NOT NULL`,
    );
  }
}
