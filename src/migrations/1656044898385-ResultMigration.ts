import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResultMigration1656044898385 implements MigrationInterface {
  name = 'ResultMigration1656044898385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rank\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`underlying_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`comment\` varchar(255) NOT NULL, \`selected_by\` varchar(255) NOT NULL, \`underlying_pchng\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`marketDateId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`market_dates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(255) NOT NULL, \`isOpen\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`result\` ADD CONSTRAINT \`FK_4541813791410be3091336f5835\` FOREIGN KEY (\`marketDateId\`) REFERENCES \`market_dates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_4541813791410be3091336f5835\``,
    );
    await queryRunner.query(`DROP TABLE \`market_dates\``);
    await queryRunner.query(`DROP TABLE \`result\``);
  }
}
