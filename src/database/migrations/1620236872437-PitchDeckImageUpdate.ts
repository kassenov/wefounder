import { MigrationInterface, QueryRunner } from "typeorm";

export class PitchDeckImageUpdate1620236872437 implements MigrationInterface {
  name = "PitchDeckImageUpdate1620236872437";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_e7f93054ddb0886c0bc823e6b5"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "filePath" text NOT NULL, "pitchDeckId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "uploadId" varchar, CONSTRAINT "FK_b4387da7a37a60edfa886e42e3c" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pitch_deck_image"("id", "filePath", "pitchDeckId") SELECT "id", "filePath", "pitchDeckId" FROM "pitch_deck_image"`
    );
    await queryRunner.query(`DROP TABLE "pitch_deck_image"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_pitch_deck_image" RENAME TO "pitch_deck_image"`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e7f93054ddb0886c0bc823e6b5" ON "pitch_deck_image" ("filePath") `
    );
    await queryRunner.query(`DROP INDEX "IDX_e7f93054ddb0886c0bc823e6b5"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "filePath" text NOT NULL, "pitchDeckId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "uploadId" varchar, CONSTRAINT "FK_b4387da7a37a60edfa886e42e3c" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_42bfca3b1fcd4f82c61df1c41c9" FOREIGN KEY ("uploadId") REFERENCES "pitch_deck_upload" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_pitch_deck_image"("id", "filePath", "pitchDeckId", "created_at", "uploadId") SELECT "id", "filePath", "pitchDeckId", "created_at", "uploadId" FROM "pitch_deck_image"`
    );
    await queryRunner.query(`DROP TABLE "pitch_deck_image"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_pitch_deck_image" RENAME TO "pitch_deck_image"`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e7f93054ddb0886c0bc823e6b5" ON "pitch_deck_image" ("filePath") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_e7f93054ddb0886c0bc823e6b5"`);
    await queryRunner.query(
      `ALTER TABLE "pitch_deck_image" RENAME TO "temporary_pitch_deck_image"`
    );
    await queryRunner.query(
      `CREATE TABLE "pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "filePath" text NOT NULL, "pitchDeckId" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "uploadId" varchar, CONSTRAINT "FK_b4387da7a37a60edfa886e42e3c" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "pitch_deck_image"("id", "filePath", "pitchDeckId", "created_at", "uploadId") SELECT "id", "filePath", "pitchDeckId", "created_at", "uploadId" FROM "temporary_pitch_deck_image"`
    );
    await queryRunner.query(`DROP TABLE "temporary_pitch_deck_image"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e7f93054ddb0886c0bc823e6b5" ON "pitch_deck_image" ("filePath") `
    );
    await queryRunner.query(`DROP INDEX "IDX_e7f93054ddb0886c0bc823e6b5"`);
    await queryRunner.query(
      `ALTER TABLE "pitch_deck_image" RENAME TO "temporary_pitch_deck_image"`
    );
    await queryRunner.query(
      `CREATE TABLE "pitch_deck_image" ("id" varchar PRIMARY KEY NOT NULL, "filePath" text NOT NULL, "pitchDeckId" varchar, CONSTRAINT "FK_b4387da7a37a60edfa886e42e3c" FOREIGN KEY ("pitchDeckId") REFERENCES "pitch_deck" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "pitch_deck_image"("id", "filePath", "pitchDeckId") SELECT "id", "filePath", "pitchDeckId" FROM "temporary_pitch_deck_image"`
    );
    await queryRunner.query(`DROP TABLE "temporary_pitch_deck_image"`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e7f93054ddb0886c0bc823e6b5" ON "pitch_deck_image" ("filePath") `
    );
  }
}
