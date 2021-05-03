import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1620075651323 implements MigrationInterface {
    name = 'initial1620075651323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "fileName" text NOT NULL, "originalFileName" text NOT NULL, "pitchDeckId" varchar)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_595eb7a22bfd4f12396eacfc45" ON "pitch_deck_upload" ("fileName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0e205af366ef6d0995b103a85" ON "pitch_deck_upload" ("originalFileName") `);
        await queryRunner.query(`CREATE TABLE "pitch_deck" ("id" varchar PRIMARY KEY NOT NULL, "slug" text NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1aefa31490fba0ad83ab10702" ON "pitch_deck" ("slug") `);
        await queryRunner.query(`CREATE TABLE "company" ("id" varchar PRIMARY KEY NOT NULL, "slug" text NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_47216baa0f0c8ebc6ee5a74989" ON "company" ("slug") `);
        await queryRunner.query(`CREATE TABLE "pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "fileName" text NOT NULL, "pitchDeckId" varchar)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a7137794ad5737426ef9a81f96" ON "pitch_deck_image" ("fileName") `);
        await queryRunner.query(`DROP INDEX "IDX_595eb7a22bfd4f12396eacfc45"`);
        await queryRunner.query(`DROP INDEX "IDX_b0e205af366ef6d0995b103a85"`);
        await queryRunner.query(`CREATE TABLE "temporary_pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "fileName" text NOT NULL, "originalFileName" text NOT NULL, "pitchDeckId" varchar, CONSTRAINT "FK_470bcef37b3bebaea6bab658f79" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pitch_deck_upload"("id", "created_at", "fileName", "originalFileName", "pitchDeckId") SELECT "id", "created_at", "fileName", "originalFileName", "pitchDeckId" FROM "pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_upload"`);
        await queryRunner.query(`ALTER TABLE "temporary_pitch_deck_upload" RENAME TO "pitch_deck_upload"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_595eb7a22bfd4f12396eacfc45" ON "pitch_deck_upload" ("fileName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0e205af366ef6d0995b103a85" ON "pitch_deck_upload" ("originalFileName") `);
        await queryRunner.query(`DROP INDEX "IDX_f1aefa31490fba0ad83ab10702"`);
        await queryRunner.query(`CREATE TABLE "temporary_pitch_deck" ("id" varchar PRIMARY KEY NOT NULL, "slug" text NOT NULL, "companyId" varchar, CONSTRAINT "FK_2707f2daf7c2b6e4a29f3b75df6" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pitch_deck"("id", "slug", "companyId") SELECT "id", "slug", "companyId" FROM "pitch_deck"`);
        await queryRunner.query(`DROP TABLE "pitch_deck"`);
        await queryRunner.query(`ALTER TABLE "temporary_pitch_deck" RENAME TO "pitch_deck"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1aefa31490fba0ad83ab10702" ON "pitch_deck" ("slug") `);
        await queryRunner.query(`DROP INDEX "IDX_a7137794ad5737426ef9a81f96"`);
        await queryRunner.query(`CREATE TABLE "temporary_pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "fileName" text NOT NULL, "pitchDeckId" varchar, CONSTRAINT "FK_b4387da7a37a60edfa886e42e3c" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pitch_deck_image"("id", "fileName", "pitchDeckId") SELECT "id", "fileName", "pitchDeckId" FROM "pitch_deck_image"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_image"`);
        await queryRunner.query(`ALTER TABLE "temporary_pitch_deck_image" RENAME TO "pitch_deck_image"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a7137794ad5737426ef9a81f96" ON "pitch_deck_image" ("fileName") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_a7137794ad5737426ef9a81f96"`);
        await queryRunner.query(`ALTER TABLE "pitch_deck_image" RENAME TO "temporary_pitch_deck_image"`);
        await queryRunner.query(`CREATE TABLE "pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "fileName" text NOT NULL, "pitchDeckId" varchar)`);
        await queryRunner.query(`INSERT INTO "pitch_deck_image"("id", "fileName", "pitchDeckId") SELECT "id", "fileName", "pitchDeckId" FROM "temporary_pitch_deck_image"`);
        await queryRunner.query(`DROP TABLE "temporary_pitch_deck_image"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a7137794ad5737426ef9a81f96" ON "pitch_deck_image" ("fileName") `);
        await queryRunner.query(`DROP INDEX "IDX_f1aefa31490fba0ad83ab10702"`);
        await queryRunner.query(`ALTER TABLE "pitch_deck" RENAME TO "temporary_pitch_deck"`);
        await queryRunner.query(`CREATE TABLE "pitch_deck" ("id" varchar PRIMARY KEY NOT NULL, "slug" text NOT NULL, "companyId" varchar)`);
        await queryRunner.query(`INSERT INTO "pitch_deck"("id", "slug", "companyId") SELECT "id", "slug", "companyId" FROM "temporary_pitch_deck"`);
        await queryRunner.query(`DROP TABLE "temporary_pitch_deck"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f1aefa31490fba0ad83ab10702" ON "pitch_deck" ("slug") `);
        await queryRunner.query(`DROP INDEX "IDX_b0e205af366ef6d0995b103a85"`);
        await queryRunner.query(`DROP INDEX "IDX_595eb7a22bfd4f12396eacfc45"`);
        await queryRunner.query(`ALTER TABLE "pitch_deck_upload" RENAME TO "temporary_pitch_deck_upload"`);
        await queryRunner.query(`CREATE TABLE "pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "fileName" text NOT NULL, "originalFileName" text NOT NULL, "pitchDeckId" varchar)`);
        await queryRunner.query(`INSERT INTO "pitch_deck_upload"("id", "created_at", "fileName", "originalFileName", "pitchDeckId") SELECT "id", "created_at", "fileName", "originalFileName", "pitchDeckId" FROM "temporary_pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "temporary_pitch_deck_upload"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0e205af366ef6d0995b103a85" ON "pitch_deck_upload" ("originalFileName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_595eb7a22bfd4f12396eacfc45" ON "pitch_deck_upload" ("fileName") `);
        await queryRunner.query(`DROP INDEX "IDX_a7137794ad5737426ef9a81f96"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_image"`);
        await queryRunner.query(`DROP INDEX "IDX_47216baa0f0c8ebc6ee5a74989"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP INDEX "IDX_f1aefa31490fba0ad83ab10702"`);
        await queryRunner.query(`DROP TABLE "pitch_deck"`);
        await queryRunner.query(`DROP INDEX "IDX_b0e205af366ef6d0995b103a85"`);
        await queryRunner.query(`DROP INDEX "IDX_595eb7a22bfd4f12396eacfc45"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_upload"`);
    }

}
