import { MigrationInterface, QueryRunner } from "typeorm";

export class ResultMigration1655955318204 implements MigrationInterface {
    name = 'ResultMigration1655955318204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`name123\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`name123\` varchar(255) NOT NULL`);
    }

}
