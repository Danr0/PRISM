import {MigrationInterface, QueryRunner} from "typeorm";

export class MailsMigration1616580198651 implements MigrationInterface {
    name = 'MailsMigration1616580198651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mails" ("id" SERIAL NOT NULL, "body" character varying NOT NULL, "attachments" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_218248d7dfe1b739f06e2309349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_793324f8abe574c6444356694ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_793324f8abe574c6444356694ee"`);
        await queryRunner.query(`DROP TABLE "mails"`);
    }

}
