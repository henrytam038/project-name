import { MigrationInterface, QueryRunner } from "typeorm";

export class ResultMigration1655975585085 implements MigrationInterface {
    name = 'ResultMigration1655975585085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_dates\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`market_dates\` ADD \`date\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`market_dates\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`market_dates\` ADD \`date\` datetime NOT NULL`);
    }

}
