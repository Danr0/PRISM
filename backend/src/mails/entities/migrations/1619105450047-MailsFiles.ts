import {MigrationInterface, QueryRunner} from "typeorm";

export class MailsFiles1619105450047 implements MigrationInterface {
    name = 'MailsFiles1619105450047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" ADD "from" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mails" ADD "to" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mails" ADD "subject" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "to"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "from"`);
    }

}
