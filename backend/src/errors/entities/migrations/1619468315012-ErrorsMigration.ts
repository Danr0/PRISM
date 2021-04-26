import {MigrationInterface, QueryRunner} from "typeorm";

export class ErrorsMigration1619468315012 implements MigrationInterface {
    name = 'ErrorsMigration1619468315012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "errors" ("id" SERIAL NOT NULL, "mail_id" character varying NOT NULL, "err_msg" character varying NOT NULL, "to" character varying NOT NULL, CONSTRAINT "PK_f1ab2df89a11cd21f48ff90febb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "errors"`);
    }

}
