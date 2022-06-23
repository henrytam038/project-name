import { MigrationInterface, QueryRunner } from "typeorm";

export class ResultMigration1655956401891 implements MigrationInterface {
    name = 'ResultMigration1655956401891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`test\` varchar(255) NOT NULL`);
    }

}
