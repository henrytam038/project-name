import { MigrationInterface, QueryRunner } from "typeorm";

export class ResultMigration1656042654823 implements MigrationInterface {
    name = 'ResultMigration1656042654823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_dates\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_dates\` ADD \`test\` varchar(255) NOT NULL`);
    }

}
