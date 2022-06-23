import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResultMigration1655950921684 implements MigrationInterface {
  name = 'ResultMigration1655950921684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`result\` ADD \`new\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`new\``);
  }
}
