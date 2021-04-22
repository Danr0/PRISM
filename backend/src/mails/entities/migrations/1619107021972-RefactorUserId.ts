import {MigrationInterface, QueryRunner} from "typeorm";

export class RefactorUserId1619107021972 implements MigrationInterface {
    name = 'RefactorUserId1619107021972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP CONSTRAINT "FK_793324f8abe574c6444356694ee"`);
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "mails" ADD "user_id" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mails" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "mails" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "mails" ADD CONSTRAINT "FK_793324f8abe574c6444356694ee" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
