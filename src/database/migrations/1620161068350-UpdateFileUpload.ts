import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateFileUpload1620161068350 implements MigrationInterface {
    name = 'UpdateFileUpload1620161068350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_b0e205af366ef6d0995b103a85"`);
        await queryRunner.query(`DROP INDEX "IDX_595eb7a22bfd4f12396eacfc45"`);
        await queryRunner.query(`CREATE TABLE "temporary_pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "pitchDeckId" varchar, CONSTRAINT "FK_470bcef37b3bebaea6bab658f79" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pitch_deck_upload"("id", "created_at", "pitchDeckId") SELECT "id", "created_at", "pitchDeckId" FROM "pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_upload"`);
        await queryRunner.query(`ALTER TABLE "temporary_pitch_deck_upload" RENAME TO "pitch_deck_upload"`);
        await queryRunner.query(`CREATE TABLE "temporary_pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "pitchDeckId" varchar, "filePath" text NOT NULL, CONSTRAINT "FK_470bcef37b3bebaea6bab658f79" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_pitch_deck_upload"("id", "created_at", "pitchDeckId") SELECT "id", "created_at", "pitchDeckId" FROM "pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "pitch_deck_upload"`);
        await queryRunner.query(`ALTER TABLE "temporary_pitch_deck_upload" RENAME TO "pitch_deck_upload"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9c9aadb1be3b2889df109e7c0a" ON "pitch_deck_upload" ("filePath") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_9c9aadb1be3b2889df109e7c0a"`);
        await queryRunner.query(`ALTER TABLE "pitch_deck_upload" RENAME TO "temporary_pitch_deck_upload"`);
        await queryRunner.query(`CREATE TABLE "pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "pitchDeckId" varchar, CONSTRAINT "FK_470bcef37b3bebaea6bab658f79" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pitch_deck_upload"("id", "created_at", "pitchDeckId") SELECT "id", "created_at", "pitchDeckId" FROM "temporary_pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "temporary_pitch_deck_upload"`);
        await queryRunner.query(`ALTER TABLE "pitch_deck_upload" RENAME TO "temporary_pitch_deck_upload"`);
        await queryRunner.query(`CREATE TABLE "pitch_deck_upload" ("id" varchar PRIMARY KEY NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "fileName" text NOT NULL, "originalFileName" text NOT NULL, "pitchDeckId" varchar, CONSTRAINT "FK_470bcef37b3bebaea6bab658f79" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "pitch_deck_upload"("id", "created_at", "pitchDeckId") SELECT "id", "created_at", "pitchDeckId" FROM "temporary_pitch_deck_upload"`);
        await queryRunner.query(`DROP TABLE "temporary_pitch_deck_upload"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_595eb7a22bfd4f12396eacfc45" ON "pitch_deck_upload" ("fileName") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b0e205af366ef6d0995b103a85" ON "pitch_deck_upload" ("originalFileName") `);
    }

}
