import { MigrationInterface, QueryRunner } from "typeorm";

export class ResultMigration1655971674944 implements MigrationInterface {
    name = 'ResultMigration1655971674944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`market_dates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` datetime NOT NULL, \`isOpen\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`underlying\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`underlying_id\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`underlying_pchng\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`marketDateId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` ADD CONSTRAINT \`FK_4541813791410be3091336f5835\` FOREIGN KEY (\`marketDateId\`) REFERENCES \`market_dates\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`result\` DROP FOREIGN KEY \`FK_4541813791410be3091336f5835\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`marketDateId\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`underlying_pchng\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`underlying_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`underlying\``);
        await queryRunner.query(`DROP TABLE \`market_dates\``);
    }

}
