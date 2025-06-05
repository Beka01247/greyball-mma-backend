import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1749080262133 implements MigrationInterface {
    name = 'InitialSchema1749080262133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fighter" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "nickname" character varying, "birthDate" date NOT NULL, "nationality" character varying NOT NULL, "height" numeric(5,2) NOT NULL, "weight" numeric(5,2) NOT NULL, "totalWins" integer NOT NULL DEFAULT '0', "totalLosses" integer NOT NULL DEFAULT '0', "totalDraws" integer NOT NULL DEFAULT '0', "totalKnockouts" integer NOT NULL DEFAULT '0', "totalSubmissions" integer NOT NULL DEFAULT '0', "weightClassId" integer, CONSTRAINT "PK_2719a8a2de10cfa27adde3f15db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weight_class" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "minWeight" numeric(5,2) NOT NULL, "maxWeight" numeric(5,2) NOT NULL, CONSTRAINT "PK_3f22799092098ee257e497c465a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "eventDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fight" ("id" SERIAL NOT NULL, "fightDate" TIMESTAMP NOT NULL, "method" character varying, "fightResultDetails" character varying NOT NULL DEFAULT '', "fighter1Id" integer NOT NULL, "fighter2Id" integer NOT NULL, "winnerId" integer, "eventId" integer NOT NULL, CONSTRAINT "PK_c6ddb4bcedc3415b9f1b9d07b06" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ranking" ("id" SERIAL NOT NULL, "points" numeric(10,4) NOT NULL, "consecutiveWins" integer NOT NULL DEFAULT '0', "consecutiveLosses" integer NOT NULL DEFAULT '0', "lastFightDate" TIMESTAMP NOT NULL, "isFormerChampion" boolean NOT NULL DEFAULT false, "fighterId" integer, "weightClassId" integer, CONSTRAINT "PK_bf82b8f271e50232e6a3fcb09a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "fighter" ADD CONSTRAINT "FK_b0c6a0bf5d29f2260d889854b30" FOREIGN KEY ("weightClassId") REFERENCES "weight_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_2de71cc862710b86b748c517df0" FOREIGN KEY ("fighter1Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472" FOREIGN KEY ("fighter2Id") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_bafc71189768827955608067eb9" FOREIGN KEY ("winnerId") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fight" ADD CONSTRAINT "FK_5b977841fa5df7809fede4adb2b" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346" FOREIGN KEY ("fighterId") REFERENCES "fighter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ranking" ADD CONSTRAINT "FK_4b7ddb3c78276e24271f9877be7" FOREIGN KEY ("weightClassId") REFERENCES "weight_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ranking" DROP CONSTRAINT "FK_4b7ddb3c78276e24271f9877be7"`);
        await queryRunner.query(`ALTER TABLE "ranking" DROP CONSTRAINT "FK_f882b9a53f25d1c8e5fe67ab346"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_5b977841fa5df7809fede4adb2b"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_bafc71189768827955608067eb9"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_4664ae59ee7c3a84b085fd16472"`);
        await queryRunner.query(`ALTER TABLE "fight" DROP CONSTRAINT "FK_2de71cc862710b86b748c517df0"`);
        await queryRunner.query(`ALTER TABLE "fighter" DROP CONSTRAINT "FK_b0c6a0bf5d29f2260d889854b30"`);
        await queryRunner.query(`DROP TABLE "ranking"`);
        await queryRunner.query(`DROP TABLE "fight"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "weight_class"`);
        await queryRunner.query(`DROP TABLE "fighter"`);
    }

}
